import React from 'react';
import axios from 'axios';

const DeleteField = ({ fieldId, onDelete }) => {
  const handleDelete = async (fieldId) => {
    try {
      await axios.delete(`/api/fields/${fieldId}`);
      setFields(fields.filter((field) => field._id !== fieldId));
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };
  

  return (
    <button onClick={handleDelete}>
      Delete Field
    </button>
  );
}

export default DeleteField;
