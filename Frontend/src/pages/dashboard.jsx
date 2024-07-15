import React from 'react'
import Layout from '../components/layout'
import { FaEthernet } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { MdDevices } from "react-icons/md";

function Dashboard() {
  return (
    <Layout>
      <div className='dashboard'>
      <div className='card'>
         <div className='card-1'>
            <div className='card-txt'>Active Ports<FaEthernet  className='card-icons'/>
           </div>
           <div className='card-counts'>200</div>
            
         </div>
         <div className='card-2'>
            <div className='card-txt'>Inactive Ports<FaEthernet  className='card-icons'/></div> 
            <div className='card-counts'>200</div>
         </div>
         <div className='card-4'>
            <div className='card-txt'> Devices Connected<MdDevices className='card-icons'/></div>
            <div className='card-counts'>200</div> 
         </div>
         <div className='card-3'>
            <div className='card-txt'>Total Users<HiUsers  className='card-icons'/></div> 
            <div className='card-counts'>200</div>
         </div>
        
       </div> 
       </div>
    </Layout>
  )
}

export default Dashboard
