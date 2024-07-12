import React, { useState } from 'react';
import axios from 'axios';
import Modal from'react-modal';
import Layout from '../components/layout';
import FieldList from '../../Config/api';
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function NetworkManagement() {
  const [fields, setFields] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/fields', formData);
      setFields([...fields, response.data]);
      setFormData({
        portNumber: '',
        typeOfDevice: '',
        status: '',
        user: '',
        officeNo: '',
        department: '',
      });
      setIsOpen(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    } catch (error) {
      console.error('Error creating field:', error);
    }
  };

  return (
    <Layout>
      <div className='networkManagement'>
        <div className='networkManagement-header'>Connections List</div><hr/>
        <div className='networkManagement-content'>
          <div className='top-content'>
            <input className='search' type='search' placeholder='Search...'></input>
            <button onClick={() => setIsOpen(true)} className='add-btn'>ADD<IoMdAddCircle className='add-icon' /></button>
          </div>
          <Modal className='input-modal' overlayClassName='modal-overlay'
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Create Field">
           <div > <button className='btn-cancel' onClick={() => setIsOpen(false)}><AiOutlineClose /></button></div>
           <div className='modal-header'> <h3>Add New Field</h3></div>
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
              <option value="" ></option>
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
          <div className='btn-container'>
          <button className='btn-modal' onClick={handleCreate}>Submit</button>


          </div>
          </Modal>
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
              <FieldList />
            </tbody>
          </table>
         </div>
         {showMessage && (<div className="message-box">Field created successfully!</div>)}
      </div>
    </Layout>
  );
}

export default NetworkManagement
