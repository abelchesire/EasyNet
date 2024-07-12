import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineEdit , MdDelete} from "react-icons/md";


function FieldList() {
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
  }, []);

  

   const handleUpdate = (fieldId) => {
    console.log(`Updating field with ID:${fieldId}`);
  };

   const handleDelete =(fieldId) => {
    console.log(`Deleting field with ID:${fieldId}`);
  };

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
          <td className='action'>
            <button className='btn-UpDel' onClick={() => handleUpdate(field._id)}>
            <MdOutlineEdit />
            </button>
            <button className='btn-UpDel'  onClick={() => handleDelete(field._id)}>
            <MdDelete /></button>
            </td>
        </tr>
      ))}
    </>
  );
}



export default FieldList;





