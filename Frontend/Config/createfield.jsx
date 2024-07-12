import React from 'react'
import axios from 'axios'

function Createfield() {
    const[formData, setFormData] = useState({
    portNumber: '',
    typeOfDevice: '',
    status: '',
    user: '',
    officeNo: '',
    department: '',
    });
    alert('Field Created Successfully')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
      };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
        axios.post('api/fields', formData)
        }catch(error){
            console.log("Error creating field:", error);
        };
    }
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
       <label htmlFor="typeOfDevice">Type of Device:</label>
          <input
            type="text"
            id="typeOfDevice"
            name="typeOfDevice"
            value={formData.typeOfDevice}
            onChange={handleChange}
          />
       </div>
       <div>
       <label htmlFor="status">status:</label>
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
                </form>
      <button type='submit'>Create Field</button>
    
    </div>
  )
}

export default Createfield
