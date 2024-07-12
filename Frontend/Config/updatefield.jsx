import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="portNumber">Port Number:</label>
          <input
            type="text"
            id="portNumber"
            name="portNumber"
            value={formData.portNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="officeNo">Office No:</label>
          <input
            type="text"
            id="officeNo"
            name="officeNo"
            value={formData.officeNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Field</button>
      </form>
    </div>
  );
};

export default UpdateField;
