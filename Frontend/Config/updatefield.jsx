import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const UpdateField = ({ field }) => {
  const [formData, setFormData] = useState({
    portNumber: field.portNumber,
    typeOfDevice: field.typeOfDevice,
    status: field.status,
    user: field.user,
    officeNo: field.officeNo,
    department: field.department,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/fields/${field._id}`, formData);
      alert('Field updated successfully!');
      setFormData({
        portNumber: field.portNumber,
        typeOfDevice: field.typeOfDevice,
        status: field.status,
        user: field.user,
        officeNo: field.officeNo,
        department: field.department,
      });
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  return (
   
    <div>
      <Modal 
      isOpen={true}
      onRequestClose={onClose}
      contentLabel='Update Field'>
        <h2>Update Field</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="portNumber"
            name="portNumber"
            placeholder='Port Number'
            value={formData.portNumber}
            onChange={handleChange}
          />
        
        
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            placeholder='Status'
            value={formData.status}
            onChange={handleChange}
          />
        
        
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            name="user"
            placeholder='User'
            value={formData.user}
            onChange={handleChange}
          />
        
        
          <label htmlFor="officeNo">Office No:</label>
          <input
            type="text"
            id="officeNo"
            name="officeNo"
            placeholder='Office No'
            value={formData.officeNo}
            onChange={handleChange}
          />
        
        
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            placeholder='Department'
            value={formData.department}
            onChange={handleChange}
          />
          <button type="submit">Update Field</button>
          <button onClick={onClose}>Close</button>
        </form>
      </Modal>
    
    </div>
   
  );
};

export default UpdateField;
