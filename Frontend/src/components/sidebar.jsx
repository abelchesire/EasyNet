import React from 'react'
import { FaBattleNet } from "react-icons/fa";
import { Link } from'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";


function Sidebar() {
  return(
    <div className='sidebar'>
      <div className='logo'><FaBattleNet  className='link-icons' /><span className='lg-txt'>EasyNet</span></div>
       <div className='top'>
          <div className='top-links'>
            
            <Link to='/' className='link-items'><MdDashboard className='link-icons' />Dashboard</Link>
            <Link to='/networkManagement'className='link-items'><FaNetworkWired  className='link-icons' />Network Management</Link>
            <Link to='/reports'className='link-items'><HiOutlineDocumentReport   className='link-icons'/>Reports</Link>
            
          </div>
       
      </div>
      <div className='bottom'></div>
      <div className='bottom-links'>
            <Link to='/settings'className='bottom-items'><IoSettingsOutline  className='link-icons'/>Settings</Link>
            <Link to='/logout'className='bottom-items'><IoMdLogOut  className='link-icons'/>Logout</Link>
      </div>
    </div>
  )
  }
export default Sidebar
