import React from 'react'
import Header from './header.jsx'
import Sidebar from './sidebar.jsx'

function Layout({ children }) {
  return (
    <div className='layout'>
      <Sidebar/>
      <div className='main-layout'>
       <Header/>
        <div className='main-content'>
          {children}

       </div>
      </div>
    </div>
  )
}

export default Layout
