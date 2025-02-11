import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex pt-20 bg-white">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <div
          className={`flex-1 p-6 transition-all duration-300 
          ${isCollapsed ? "ml-20" : "ml-64"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
