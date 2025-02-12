import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo2 from "../assets/iconpng.png";
import Image1 from "../assets/Image1";
import Image2 from "../assets/Image2";
import Image3 from "../assets/Image3";
import Image4 from "../assets/Image4";
import Image5 from "../assets/Image5";
import Setting from "../assets/Setting";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();


  return (
    <>
      {/* Toggle Button (Always Visible) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-4 left-4 text-black text-2xl z-50 bg-white p-2 rounded-md shadow-md"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`h-full bg-back_ground text-black flex flex-col p-6 fixed top-0 left-0 transition-all duration-300 z-40 
        ${isCollapsed ? "-translate-x-full" : "translate-x-0"} md:translate-x-0 w-64 md:w-64`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo2}
            alt="Logo"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="object-contain cursor-pointer transition-transform duration-300 w-[156.88px] h-[185px]"
          />
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
              location.pathname === "/dashboard" ? "bg-main text-white" : "bg-white"
            }`}
          >
            <div className="w-5 h-5"><Image1 /></div>
            <p>Dashboard</p>
          </Link>

          <Link
            to="/product"
            className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
              location.pathname.startsWith("/product")  ? "bg-main text-white" : "bg-white"
            }`}
          >
            <div className="w-5 h-5"><Image2 /></div>
            <p>Products</p>
          </Link>

          <Link
            to="/order"
            className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
              location.pathname === "/order" ? "bg-main text-white" : "bg-white"
            }`}
          >
            <div className="w-5 h-5"><Image3 /></div>
            <p>Orders</p>
          </Link>

          <Link
            to="/user"
            className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
              location.pathname.startsWith("/user") ? "bg-main text-white" : "bg-white"
            }`}
          >
            <div className="w-5 h-5"><Image4 /></div>
            <p>Users</p>
          </Link>

          <Link
            to="/category"
            className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
              location.pathname.startsWith("/category") ? "bg-main text-white" : "bg-white"
            }`}
          >
            <div className="w-5 h-5"><Image5 /></div>
            <p>Categories</p>
          </Link>

          <Link
            to="/settings"
            className={`text-black text-lg font-medium p-2 rounded-md flex items-center gap-2 ${
              location.pathname === "/settings" ? "bg-main text-white" : "bg-white"
            }`}
          >
            <div className="w-5 h-5"><Setting /></div>
            <p>Setting</p>
          </Link>
        </nav>
      </div>

      {/* Overlay for Small Screens */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
