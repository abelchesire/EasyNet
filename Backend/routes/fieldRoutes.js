import express from 'express';
import Field from '../models/fieldsModels.js';
import PDFDocument from 'pdfkit';

const router = express.Router();

//get all fields
router.get('/',async (req,res) =>{
    try {
        const field = await Field.find();
        res.json(field);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
router.get('/:id',getSingleField,(req,res) => {
    res.json(res.Field);    
});


//Get counts
router.get('/dashboard-counts', async ( req, res) => {
    try {
        const counts = await Field.aggregate([
            {
                $group: {
                    _id: null,
                    activePorts: {
                        $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
                    },
                    inactivePorts: {
                        $sum: { $cond: [{ $eq: ['$status', 'Inactive'] }, 1, 0] }
                    },
                    totalDevices:{$sum: 1},
                    totalUsers:{ $addToSet: '$user'}
                }
            },
            {
                $project: {
                    _id: 0,
                    activePorts: 1,
                    inactivePorts: 1,
                    totalDevices: 1,
                    totalUsers: {$size: '$totalUsers'}
                }
            }
        ]);

        res.json(counts[0] || {
            activePorts: 0,
            inactivePorts: 0,
            totalDevices: 0,
            totalUsers: 0
        });
    } catch (err) {
        console.error('Detailed error:', err);
        res.status(500).json({ message: err.message , stack:err.stack});
    }
});

//Post a new field

router.post('/',async (req,res) => {
    const field = new Field({
        portNumber: req.body.portNumber,
        typeOfDevice: req.body.typeOfDevice,
        status: req.body.status,
        user: req.body.user,
        officeNo: req.body.officeNo,
        department: req.body.department
    });
    try {
        const newField = await field.save();
        res.status(201).json(newField);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});
//Update a field
router.patch('/:id', getSingleField, async (req, res) => {
    if (req.body.portNumber != null) {
        if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]{1,5}$/.test(req.body.portNumber)) {
            return res.status(400).json({ message: "Port Number must be valid." });
        }
        
    }

    if (req.body.status != null) {
        if (!['Active', 'Inactive'].includes(req.body.status)) {
            return res.status(400).json({ message: "Status must be either Active or Inactive." });
        }
    }

    if (req.body.user != null) {
        if (req.body.user.trim() === '') {
            return res.status(400).json({ message: "User cannot be empty." });
        }
    }

    if (req.body.officeNo != null) {
        if (!/^\d+(\.\d+)?$/.test(req.body.officeNo)) {
            return res.status(400).json({ message: "Office Number must be a valid number." });
        }
    }

    if (req.body.department != null) {
        const validDepartments = ['ICT', 'HR', 'TAS', 'MRPD', 'REG', 'Director', 'Finance', 'Security'];
        if (!validDepartments.includes(req.body.department)) {
            return res.status(400).json({ message: "Invalid department selected." });
        }
    }

    if (req.body.portNumber != null) {
        res.field.portNumber = req.body.portNumber;
    }
    if (req.body.typeOfDevice != null) {
        res.field.typeOfDevice = req.body.typeOfDevice;
    }
    if (req.body.status != null) {
        res.field.status = req.body.status;
    }
    if (req.body.user != null) {
        res.field.user = req.body.user;
    }
    if (req.body.officeNo != null) {
        res.field.officeNo = req.body.officeNo;
    }
    if (req.body.department != null) {
        res.field.department = req.body.department;
    }
    try {
        const updatedField = await res.field.save();
        res.json(updatedField);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Server Error' });
        }
    }
});
//Delete a field
router.delete('/:id', async (req, res) => {
    try {
      const field = await Field.findByIdAndDelete(req.params.id);
      if (!field) {
        return res.status(404).json({ message: "Field not found" });
      }
      res.json({ message: "Field deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


//Middleware to get a single field by id
async function getSingleField(req,res,next){
    let field;
    try {
        const id = req.params.id;
        field = await Field.findOne({_id: id});
    if (field == null) {
      return res.status(404).json({ message: "Cannot find field" });
    }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.field = field;
    next();
}
export default router;


// Port Utilization Report
router.get('/report/port-utilization', async (req, res) => {
    try {
        const report = await Field.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=port-utilization.pdf');

        doc.pipe(res);

        doc.fontSize(16).text('Port Utilization Report', {align: 'center'});
        doc.moveDown();

        report.forEach(item => {
            doc.fontSize(12).text(`${item._id} Ports: ${item.count}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Device Connection Report
router.get('/report/device-connection', async (req, res) => {
    try {
        const report = await Field.aggregate([
            {
                $group: {
                    _id: {typeOfDevice:'$typeOfDevice',},
                    count: { $sum: 1 }
                }
            }
        ]);
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=device-connection.pdf');

        doc.pipe(res);

        doc.fontSize(16).text('Device Connection Report', {align: 'center'});
        doc.moveDown();

        report.forEach(item => {
            doc.fontSize(12).text(`${item._id.typeOfDevice} - ${item.count}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// User Assignment Report
router.get('/report/user-assignment', async (req, res) => {
    try {
        const report = await Field.find().select('user department portNumber');
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=user-assignment.pdf');

        doc.pipe(res);

        doc.fontSize(16).text('User Assignment Report', {align: 'center'});
        doc.moveDown();

        report.forEach(item => {
            doc.fontSize(12).text(`User: ${item.user}, Department: ${item.department}, Port Number: ${item.portNumber}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Connectivity Report
router.get('/report/connectivity', async (req, res) => {
    try {
        const report = await Field.aggregate([
            {
                $group: {
                    _id: '$department',
                    activeConnections: {
                        $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
                    },
                    inactiveConnections: {
                        $sum: { $cond: [{ $eq: ['$status', 'Inactive'] }, 1, 0] }
                    },
                    totalUsers : {$addToSet: '$user'}
                }
            },
         {  
            $project: {
                department: '$_id',
                activeConnections: 1,
                inactiveConnections: 1,
                totalUsers: {$size: '$totalUsers'}
            }
        }
        ]);
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=connectivity.pdf');

        doc.pipe(res);

        doc.fontSize(16).text('Connectivity Report', {align: 'center'});
        doc.moveDown();

        report.forEach(dept => {
            doc.fontSize(14).text(`Department: ${dept.department}`);
            doc.fontSize(12).text(`Active Connections: ${dept.activeConnections}`);
            doc.text(`Inactive Connections: ${dept.inactiveConnections}`);
            doc.text(`Number of Users: ${dept.totalUsers}`);
            doc.moveDown();
        });

        doc.end();
        console.log('PDF generation completed successfully');
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).json({ message: err.message });
    }
});

// General Report
router.get('/report/general', async (req, res) => {
    try {
        const fields = await Field.find();
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=general-report.pdf');

        doc.pipe(res);

        doc.fontSize(16).text('General Report', {align: 'center'});
        doc.moveDown();

        fields.forEach(field => {
            doc.fontSize(14).text(`Port Number: ${field.portNumber}`);
            doc.fontSize(12).text(`Type of Device: ${field.typeOfDevice}`);
            doc.text(`Status: ${field.status}`);
            doc.text(`User: ${field.user}`);
            doc.text(`Office Number: ${field.officeNo}`);
            doc.text(`Department: ${field.department}`);
            doc.moveDown();
        });

        doc.end();
        console.log('PDF generation completed successfully');
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).json({ message: err.message });
    }
});
