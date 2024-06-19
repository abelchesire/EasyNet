import express from 'express';
import Field from '../models/fieldsModels.js';

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
    res.json(Field);    
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
router.patch('/:id',async (req,res) => {
    if(req.body.portNumber !=null){
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
        const updatedField = await Field.save();
        res.json(updatedField);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});
//Delete a field
router.delete('/:id',async (req,res) => {
    try {
        await field.remove();
        res.json({message: "field deleted"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
//Middleware to get a single field by id
async function getSingleField(req,res,next){
    let field;
    try { 
        field = await Field.findById(req.params.id);
        if(field == null){
            return res.status(404).json({message: "Cannot find field"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.field = field;
    next();
}
export default router;
