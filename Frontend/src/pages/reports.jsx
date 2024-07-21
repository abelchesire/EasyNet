import React, { useState } from 'react';
import Layout from '../components/layout';
import { FaDownload } from "react-icons/fa6";
import axios from 'axios';

function Reports() {
  const [loading, setLoading] = useState(false);

  const downloadReport = async (reportType) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/fields/report/${reportType}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}-report.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='reports'>
        {['port-utilization', 'device-connection', 'user-assignment', 'connectivity','general'].map((reportType) => (
          <div key={reportType} className='main-content-reports'>
            {reportType.replace('-', ' ').charAt(0).toUpperCase() + reportType.replace('-', ' ').slice(1)} Report
            <div className='reports-download'>
              <button 
                className='report-download-button' 
                onClick={() => downloadReport(reportType)}
                disabled={loading}
              >
                Download 
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Reports;
