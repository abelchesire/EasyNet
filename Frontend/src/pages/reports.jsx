import React from 'react'
import Layout from '../components/layout'
import { FaDownload } from "react-icons/fa6";
function Reports() {
  return (
    <Layout>
    <div className='reports'>
      <div className='main-content-reports'>Port Utilization Report
        <div className='reports-download'><button  className='report-download-button' ><FaDownload /></button></div>
      </div>
      <div className='main-content-reports'>Device Connection Report
      <div className='reports-download'><button className='report-download-button'><FaDownload /></button></div>
      </div>
      <div className='main-content-reports'>User Assignment Report
      <div className='reports-download'><button className='report-download-button'><FaDownload /></button></div>
      </div>
      <div className='main-content-reports'> Connectivity Report
      <div className='reports-download'><button className='report-download-button'><FaDownload /></button></div>
      </div>
    </div>
    </Layout>
  )
}

export default Reports
