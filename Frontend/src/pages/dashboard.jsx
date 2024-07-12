import React from 'react'
import Layout from '../components/layout'
import { BsEthernet } from "react-icons/bs";
import { BarChart } from 'recharts';

function Dashboard() {
  return (
    <Layout>
      <div className='dashboard'>
      <div className='card'>
         <div className='card-1'>
            <span className='card-txt'>Active Ports<BsEthernet className='card-icons'/><h3>200</h3></span> 
         </div>
         <div className='card-2'>
            <span className='card-txt'>Inactive Ports<BsEthernet className='card-icons'/><h3>200</h3></span> 
         </div>
         <div className='card-3'>
            <span className='card-txt'>No of Users<BsEthernet className='card-icons'/><h3>200</h3></span> 
         </div>
         <div className='card-4'>
            <span className='card-txt'>Alerts<BsEthernet className='card-icons'/><h3>200</h3></span> 
         </div>
       </div> 
       </div>
    </Layout>
  )
}

export default Dashboard
