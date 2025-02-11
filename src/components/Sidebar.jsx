import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo2 from "../assets/iconpng.png";
import Image1 from "../assets/Image1";
import Image2 from "../assets/Image2";
import Image3 from "../assets/Image3";
import Image4 from "../assets/Image4";
import Image5 from "../assets/Image5";
import Setting from "../assets/Setting";
import { FaBars } from "react-icons/fa"; // Icon for toggling

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  return (
    <div
      className={`h-full bg-back_ground text-black flex flex-col p-6 fixed top-0 left-0 transition-all duration-300 
      ${isCollapsed ? "w-16" : "w-64"}`}
    >
    

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={logo2}
          alt="Logo"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`object-contain cursor-pointer transition-transform duration-300 
          ${isCollapsed ? "w-20 h-20 mt-40" : "w-[156.88px] h-[185px]"}`}
        />
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
            location.pathname === "/dashboard" && !isCollapsed ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Image1 path={location.pathname} />
          </div>
          {!isCollapsed && <p>Dashboard</p>}
        </Link>

        <Link
          to="/product"
          className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
            location.pathname === "/product" && !isCollapsed ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Image2 path={location.pathname} />
          </div>
          {!isCollapsed && <p>Products</p>}
        </Link>

        <Link
          to="/order"
          className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
            location.pathname === "/order" && !isCollapsed ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Image3 path={location.pathname} />
          </div>
          {!isCollapsed && <p>Orders</p>}
        </Link>

        <Link
          to="/user"
          className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
            location.pathname.startsWith("/user") && !isCollapsed ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Image4 path={location.pathname} />
          </div>
          {!isCollapsed && <p>Users</p>}
        </Link>

        <Link
          to="/category"
          className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
            location.pathname.startsWith("/category") && !isCollapsed ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Image5 path={location.pathname} />
          </div>
          {!isCollapsed && <p>Categories</p>}
        </Link>

        <Link
          to="/settings"
          className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
            location.pathname === "/settings" && !isCollapsed ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5">
            <Setting path={location.pathname} />
          </div>
          {!isCollapsed && <p>Setting</p>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
