import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import user from '../assets/3jpg.jpg'
const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const navigateTo = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="fixed z-10000 top-0 right-0 w-full h-20 bg-back_ground flex items-center justify-between p-4 gap-4 shadow-md">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="text-2xl text-gray-800 focus:outline-none"
      >
        <i className={`fa-solid z-50 text-black ${isCollapsed ? "fa-bars" : "fa-times"}`}></i>
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="text-gray-600 text-2xl">
          <i className="fa-solid fa-bell"></i>
        </div>

        {/* User Info Section */}
        <div className="flex items-center text-gray-800 ml-4 relative">
          {/* User Image */}
          <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
            <img
              src={user ||"https://via.placeholder.com/50"} // Example image, replace with actual image URL
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm font-bold mr-2">
            <h2 className="text-xs text-black">Marfaa</h2>
            <span className="text-xs text-gray-700">Owner</span>
          </div>

          {/* Dropdown Icon */}
          <i
            onClick={() => setLogout((prev) => !prev)}
            className="fa-solid fa-chevron-down text-black text-xl cursor-pointer"
          ></i>

          {/* Logout Dropdown */}
          <div
            onClick={handleLogout}
            className={`logout w-[100px] h-[40px] bg-white text-black border-b-2 text-center absolute top-[100%] shadow-black right-0 flex items-center justify-center ${
              logout ? "block" : "hidden"
            } cursor-pointer`}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
