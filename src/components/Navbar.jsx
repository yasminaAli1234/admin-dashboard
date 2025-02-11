import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Navbar = () => {
  const [logout,setLogout] = useState(false);
  const navigate = useNavigate()
  const auth = useAuth()
  const navigateTo=()=>{
    navigate("/login")
  }
  const handleLogout = () => {
    auth.logout();
    navigate("/", { replace: true });
}
  return (
    <div className="fixed top-0 right-0 w-full h-20 bg-back_ground flex items-center justify-end p-4 gap-4 ">
      {/* Create New Notification Button */}
      <button className="bg-main text-white py-2 px-7 rounded-md">
        Create new
      </button>

      {/* Notification Icon */}
      <div className="text-gray-300 text-2xl">
        <i className="fa-solid fa-bell"></i>
      </div>

      {/* User Info Section */}
      <div className="flex items-center text-gray-800 ml-4 relative">
        {/* Circle Image Container */}
        <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
          <img
            src="https://via.placeholder.com/50" // Example image, replace with actual image URL
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-sm font-bold mr-2">
          <h2 className="text-xs text-black">John Doe</h2>
          <span className="text-xs text-gray-700">Owner</span>
        </div>
        <i onClick={()=>{setLogout(pre=>!pre)}}  className="fa-solid fa-chevron-down text-black text-xl cursor-pointer"></i>
        <div onClick={handleLogout} className={`logout w-[100%] h-[100%]  bg-white text-black border-b-2 text-xl  items-center justify-center absolute top-[100%] shadow-black right-10  ${logout?"flex":"hidden"} cursor-pointer`}>Logout</div>
      </div>

    </div>
  );
};

export default Navbar;
