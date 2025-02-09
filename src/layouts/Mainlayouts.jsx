import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        
        <div className="flex flex-1 pt-20 bg-white">
          <Sidebar />
          
          <div className="flex-1 p-6 ml-64 bg-white overflow-auto">
            {children}
          </div>
        </div>
      </div>
    );
  };

export default MainLayout