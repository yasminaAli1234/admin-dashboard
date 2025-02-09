import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation in React Router v6
import logo from "../../assets/logo.png";

const Navbar_category = () => {
  const navigate = useNavigate(); // For navigation in React Router v6

  const handleBackClick = () => {
    navigate(-1); // Navigate to the category page
  };

  return (
    <div className="bg-main h-20 w-full fixed top-0 left-0 flex items-center gap-4 px-6 z-50">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="flex items-center text-white bg-transparent px-4 py-2 rounded-lg border-none"
      >
        <i className="fa-solid fa-arrow-left mr-2 text-white text-2xl"></i> {/* Increased icon size */}
      </button>

      {/* Logo */}
      <div className="flex items-center w-16 h-16"> {/* Increased width/height for logo container */}
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default Navbar_category;
