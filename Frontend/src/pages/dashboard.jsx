import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { FaEthernet } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { MdDevices } from "react-icons/md";
import axios from 'axios';
import { AreaChart,XAxis,YAxis,CartesianGrid,Tooltip,Area } from 'recharts';

const FIELDLIST_URL = 'http://localhost:3000/api/fields';

function Dashboard() {
   const [counts, setCounts] = useState({
      activePorts: 0,
      inactivePorts: 0,
      connectedDevices: 0,
      totalUsers: 0
   });
    
   useEffect(() => {
      const fetchCounts = async () => {
         try {
            const response = await axios.get('http://localhost:3000/api/fields/dashboard-counts');
            setCounts(response.data);
         } catch (error) {
            console.error('Error fetching dashboard counts:', error);
         }
      };

      // Fetch counts immediately
      fetchCounts();

      // Set up interval to fetch counts every 5 seconds
      const intervalId = setInterval(fetchCounts, 5000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
   }, []);

   const data = [
      {
        "name": "Monday",
        "uv": 40,
        "pv": 24,
        "amt": 24
      },
      {
        "name": "Tuesday",
        "uv": 30,
        "pv": 13,
        "amt": 22
      },
      {
        "name": "Wednesday",
        "uv": 20,
        "pv": 98,
        "amt": 22
      },
      {
        "name": "Thursday",
        "uv": 27,
        "pv": 39,
        "amt": 20
      },
     
      {
        "name": "Friday",
        "uv": 23,
        "pv": 38,
        "amt": 25
      }
     
    ]

   return (
      <Layout>
         <div className='dashboard'>
            <div className='card'>
               <div className='card-1'>
                  <div className='card-txt'>Active Ports<FaEthernet className='card-icons'/></div>
                  <div className='card-counts'>{counts.activePorts}</div>
               </div>
               <div className='card-2'>
                  <div className='card-txt'>Inactive Ports<FaEthernet className='card-icons'/></div> 
                  <div className='card-counts'>{counts.inactivePorts}</div>
               </div>
               <div className='card-4'>
                  <div className='card-txt'>Devices Connected<MdDevices className='card-icons'/></div>
                  <div className='card-counts'>{counts.connectedDevices}</div> 
               </div>
               <div className='card-3'>
                  <div className='card-txt'>Total Users<HiUsers className='card-icons'/></div> 
                  <div className='card-counts'>{counts.totalUsers}</div>
               </div>
            </div> 

            <AreaChart width={730} height={250} data={data}
             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#d50000 " stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#d50000 " stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#2e7d32" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="uv" stroke="#d50000 " fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="pv" stroke="#2e7d32" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
         </div>
      </Layout>
   )
}

export default Dashboard