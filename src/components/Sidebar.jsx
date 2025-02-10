import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook
import logo2 from '../assets/iconpng.png';
import Dashboard from "../Pages/DashBorad/Dashboard";
import Product from "../Pages/Product/Product";
import Order from "../Pages/Order/Order";
import User from "../Pages/User/User";
import Category from "../Pages/Category/Category";
import Image1 from "../assets/Image1";
import Image2 from "../assets/Image2";
import Image3 from "../assets/Image3";
import Image4 from "../assets/Image4";
import Image5 from "../assets/Image5";

const Sidebar = () => {
  const location = useLocation(); // Get current location (path)
  
  return (
    <div className="w-64 h-full bg-back_ground text-black flex flex-col p-6 fixed top-0 left-0">
      {/* Logo Section */}
      <div className="flex justify-center mb-6">
        <img
          src={logo2} // Display the imported logo
          alt="Logo"
          className="w-[156.88px] h-[185px] object-contain transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Sidebar Menu Items */}
      <nav className="flex flex-col gap-4">
        {/* Dashboard link */}
        <Link
          to="/dashboard" // Dashboard route
          className={`text-black text-lg font-medium p-2 rounded-md transition-colors duration-300 flex items-center gap-2 border-none ${
            location.pathname === "/dashboard" ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5 ">
            <Image1/>
          </div>
          <p>Dashboard</p>
        </Link>

        {/* Product link */}
        <Link
          to="/product" // Product route
          className={`text-black text-lg font-medium p-2 rounded-md transition-colors duration-300 flex items-center gap-2 border-none ${
            location.pathname === "/product" ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5 ">
            <Image2/>
          </div>
          <p>Products</p>
        </Link>

        {/* Order link */}
        <Link
          to="/order" // Orders route
          className={`text-black text-lg font-medium p-2 rounded-md transition-colors duration-300 flex items-center gap-2 border-none ${
            location.pathname === "/order" ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5 ">
            <Image3/>
          </div>
          <p>Orders</p>
        </Link>

        {/* User link */}
        <Link
          to="/user" // Users route
          className={`text-black text-lg font-medium p-2 rounded-md transition-colors duration-300 flex items-center gap-2 border-none ${
            location.pathname === "/user" || location.pathname === "/user/info" ||location.pathname.startsWith("/update_user/") ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5 ">
            <Image4/>
          </div>
          <p>Users</p>
        </Link>

        {/* Category link */}
        <Link
          to="/category" // Categories route
          className={`text-black text-lg font-medium p-2 rounded-md transition-colors duration-300 flex items-center gap-2 border-none ${
            (location.pathname === "/category" || location.pathname === "/category/update") ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5 ">
            <Image5/>
          </div>
          <p>Categories</p>
        </Link>
          {/* settings link */}
          <Link
          to="/settings" // Categories route
          className={`text-black text-lg font-medium p-2 rounded-md transition-colors duration-300 flex items-center gap-2 border-none ${
            (location.pathname === "/settings" ) ? "bg-main text-white" : "bg-white"
          }`}
        >
          <div className="w-5 h-5 ">
            <Image2/>
          </div>
          <p>Setting</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
