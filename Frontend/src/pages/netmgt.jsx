import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Layout from '../components/layout';
import FieldList from '../../Config/api';
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement('#root');
const BACKEND_URL ='https://easynet-backend.onrender.com'

function NetworkManagement() {
  const [fields, setFields] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState(null);
  const [createMessage, setCreateSuccessMessage] = useState('');
  const [deleteMessage, setDeleteSuccessMessage] = useState('');
  const [editMessage, setEditSuccessMessage] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);


  const [formData, setFormData] = useState({
    portNumber: '',
    typeOfDevice: '',
    status: '',
    user: '',
    officeNo: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };


  const clearMessage = () => {
    setCreateSuccessMessage('');
    setEditSuccessMessage('');
    setDeleteSuccessMessage('');
    setShowMessage(false);
  };
  
  const handleCreate = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/fields`, formData);
      setFields([...fields, response.data]);
      setFormData({
        portNumber: '',
        typeOfDevice: '',
        status: '',
        user: '',
        officeNo: '',
        department: '',
      });
      setCreateSuccessMessage('Field created successfully!');
      setShowMessage(true);
      setRefreshTrigger(prev =>prev + 1)
      setTimeout(() => {clearMessage();
      }, 2000);
      
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message.includes('duplicate key error')) {
        setErrorMessage('Port Number already exists!');
      }else {
        setErrorMessage('Field cannot be blank!');
      }
      console.error('Error creating field:', error);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedField(null);
    setFormData({
      portNumber: '',
      typeOfDevice: '',
      status: '',
      user: '',
      officeNo: '',
      department: '',
    });
    setIsOpen(true);
    setErrorMessage('');
    
  };

  const handleClearForm = () => {
    setFormData({
      portNumber: '',
      typeOfDevice: '',
      status: '',
      user: '',
      officeNo: '',
      department: '',
    });
    setErrorMessage('');
  };
   
  

  useEffect(() => {
    if (isSubmitting) {
      validateAndSubmit();
    }
  }, [isSubmitting, formData]);

  const handleSubmit = () => {
    setIsSubmitting(true);

  };

  const validateAndSubmit = async () => {
    if (!formData.portNumber || !formData.typeOfDevice || !formData.status || !formData.user || !formData.officeNo || !formData.department) {
      setErrorMessage('All fields are required!');
      setIsSubmitting(false);
      return;
    }

    if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]{1,5}$/.test(formData.portNumber)) {
      setErrorMessage('Port Number must be a valid string (1-5 characters, containing at least one letter)');
      setIsSubmitting(false);
      return;
    }
    
    if (!/^\d+(\.\d+)?$/.test(formData.officeNo)) {
      setErrorMessage('Office Number must be a valid number (integer or decimal)');
      setIsSubmitting(false);
      return;
    }
    if (!['Active', 'Inactive'].includes(formData.status)) {
      setErrorMessage('Status must be either Active or Inactive.');
      setIsSubmitting(false);
      return;
    }
    const validDepartments = ['ICT', 'HR', 'TAS', 'MRPD', 'REG', 'Director', 'Finance', 'Security'];
    if (!validDepartments.includes(formData.department)) {
      setErrorMessage('Invalid department selected.');
      setIsSubmitting(false);
      return;
    }

    if (selectedField) {
      await handleUpdateField();
    } else {
      await handleCreate();
    }

    setIsSubmitting(false);
    
  };

  const handleUpdateField = async () => {
    if (formData.portNumber === selectedField.portNumber && formData.typeOfDevice === selectedField.typeOfDevice && formData.status === selectedField.status && formData.user === selectedField.user && formData.officeNo === selectedField.officeNo && formData.department === selectedField.department) {
      setIsEditing(false);
      setIsOpen(false);
      return;
    }

    try {
      const response = await axios.patch(`${BACKEND_URL}/api/fields/${selectedField._id}`, formData);
      setFields(fields.map((field) => (field._id === selectedField._id? response.data : field)));
      setIsOpen(false);
      setSelectedField(null);
      setShowMessage(true);
      setEditSuccessMessage('Field updated successfully!');
      setRefreshTrigger(prev =>prev + 1)
      setTimeout(() => {clearMessage();

      }
      , 2000);
    } catch (error) {
       if (error.response && error.response.status  && error.response.data.message.includes('duplicate key error')) {
        setErrorMessage('error.response.data.message');
      }else {
        setErrorMessage('An unexpected error occurred while updating the field');
      }
      console.error('Error updating field:', error.response?.data || error.message);
    }
  };
   
  
   
  const openEditModal = (field) => {
    setSelectedField(field);
    setFormData(field);
    setIsEditing(true);
    setIsOpen(true);
    setErrorMessage('');
  };



   const handleDelete = (field) => {
    console.log('handleDelete called with field:',field);
    if (field && field._id){
      setFieldToDelete(field);
      setDeleteModalIsOpen(true);
    }else {
      setErrorMessage('No field selected to delete');
    }
   };


   const confirmDelete = async () => {
    console.log('Confirming delete for field:', fieldToDelete);
    if (fieldToDelete && fieldToDelete._id) {
      try {
        await axios.delete(`${BACKEND_URL}/api/fields/${fieldToDelete._id}`);
        setFields(fields.filter(field => field._id !== fieldToDelete._id));
        setDeleteModalIsOpen(false);
        setShowMessage(true);
        setDeleteSuccessMessage('Field deleted successfully');
        setRefreshTrigger(prev =>prev + 1)
        setTimeout(() => {clearMessage();
        }, 2000);
        
      } catch (error) {
        console.error('Error deleting field:', error);
        setErrorMessage('An error occurred while deleting the field');
      }
    } else {
      console.error('No field to delete');
      setErrorMessage('No field selected to delete');
    }
    setFieldToDelete(null);
  };

  return (
    <Layout>
      <div className='networkManagement'>
        <div className='networkManagement-header'>Connections List</div><hr/>
        <div className='networkManagement-content'>
          <div className='top-content'>
            <input className='search' type='search' placeholder='Search...'></input>
            <button onClick={openCreateModal} className='add-btn'>ADD<IoMdAddCircle className='add-icon' /></button>
          </div>

          <table className='table'>
            <thead className='thead'>
              <tr className='th-row'>
                <th>Port Number</th>
                <th>Type of Device</th>
                <th>Status</th>
                <th>User</th>
                <th>Office No</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <FieldList onUpdate={openEditModal} onDelete={handleDelete} isEditing = {isEditing} refreshTrigger = {refreshTrigger}  />
            </tbody>
          </table>

          <Modal className='input-modal' overlayClassName='modal-overlay'
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel={selectedField ? 'Edit Field' : 'Add Field'}>
           <div > <button className='btn-cancel' onClick={() => setIsOpen(false)}><AiOutlineClose /></button></div>
           <div className='modal-header'> <h3>{selectedField ? "Edit Field" : "Add New Field"}</h3></div>
          <div className='form-container'>
            <input
              type="text"
              name="portNumber"
              placeholder="Port Number"
              value={formData.portNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="typeOfDevice"
              placeholder="Type of Device"
              value={formData.typeOfDevice}
              onChange={handleChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
            />
            <input
              type="text"
              name="user"
              placeholder="User"
              value={formData.user}
              onChange={handleChange}
            />
            <input
              type="text"
              name="officeNo"
              placeholder="Office No"
              value={formData.officeNo}
              onChange={handleChange}
            />
             <select
              name="department"
              placeholder='Department'
              value={formData.department}
              onChange={handleChange}
            >
              <option value="" >Department</option>
              <option value="ICT">ICT</option>
              <option value="HR">HR</option>
              <option value="TAS">TAS</option>
              <option value="MRPD">MRPD</option>
              <option value="REG">REG</option>
              <option value="Director">Director</option>
              <option value="Finance">Finance</option>
              <option value="Security">Security</option>
            </select>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className='btn-container'>
          <button className='btn-modal' onClick={handleSubmit}> {selectedField ? "Update" : "Create"}</button>
          <button className='btn-modal btn-clear' onClick={handleClearForm}>Clear</button>

          </div>
          </Modal>
          <Modal className='delete-modal'
           overlayClassName='modal-overlay'
           isOpen={deleteModalIsOpen}
           onRequestClose={() => setDeleteModalIsOpen(false)}
           contentLabel='Delete Field'>
            <h3 className='modal-header'>Confirm Delete</h3>
              <p className='form-container'>Are you sure you want to delete this field?</p>
              <div className='btn-container'>
              <button className='btn-modal' onClick={confirmDelete}>Yes, Delete</button>
              <button className='btn-modal-cancel' onClick={() => setDeleteModalIsOpen(false)}>Cancel</button>
            </div>
            </Modal>
         </div>
         {showMessage && (<div className="message-box">
          { createMessage || editMessage || deleteMessage }
          </div>
        )}
      </div>
    </Layout>
  );
}

export default NetworkManagement;
