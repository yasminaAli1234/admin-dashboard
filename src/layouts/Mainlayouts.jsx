import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex pt-20 bg-white">
        {/* Sidebar with dynamic width */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main content area */}
        <div
          className={`p-6 transition-all duration-300 flex-1 ${
            isCollapsed ? "ml-0" : "ml-64"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
