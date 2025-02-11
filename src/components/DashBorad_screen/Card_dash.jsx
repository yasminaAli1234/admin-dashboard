import React from "react";
import { FaCheckCircle, FaClock, FaUserClock } from "react-icons/fa"; // Import icons

const Card_dash = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-6 p-6 justify-center">
      {/* Completed Orders */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-4">
        <FaCheckCircle className="text-green text-4xl" />
        <div className="flex flex-col">
          <span className="text-lg text-green font-semibold">Completed Orders</span>
          <span className="text-4xl text-green font-bold">{data?.completedOrderCount || 0}</span>
        </div>
      </div>

      {/* In-progress Orders */}
      <div className="bg-gradient-to-r from-green to-main p-6 rounded-xl shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-4">
        <FaClock className="text-white text-4xl" />
        <div className="flex flex-col">
          <span className="text-lg text-white font-semibold">In-progress Orders</span>
          <span className="text-4xl text-white font-bold">{data?.inprogressOrderCount || 0}</span>
        </div>
      </div>

      {/* Pending Sellers */}
      <div className="bg-gradient-to-r  p-6 rounded-xl shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-4">
        <FaUserClock className="text-green text-4xl" />
        <div className="flex flex-col">
          <span className="text-lg text-green font-semibold">Pending Sellers</span>
          <span className="text-4xl text-green font-bold">{data?.pendingSellerCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Card_dash;
