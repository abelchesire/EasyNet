import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function FieldList({onUpdate, onDelete ,refreshTrigger}) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/fields');
        setFields(response.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, [refreshTrigger]);


  
 

  return (
    <>
      {fields.map((field) => (
        <tr key={field._id}>
          <td>{field.portNumber}</td>
          <td>{field.typeOfDevice}</td>
          <td>{field.status}</td>
          <td>{field.user}</td>
          <td>{field.officeNo}</td>
          <td>{field.department}</td>
          <td className='action'><button className='btn-upDel' onClick={() => onUpdate(field)}><MdModeEdit /></button>
                                 <button className='btn-upDel' onClick={() => onDelete(field)}><MdDelete /></button></td>
        </tr>
      ))}
    </>
  );
}



export default FieldList;





