import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const PendingSeller = ({ data }) => {
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
  };

  const closePopup = () => {
    setSelectedSeller(null);
  };

  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold mb-6 text-black">Pending Sellers:</p>

      <div className="overflow-x-auto">
      <table className="min-w-full table-auto rounded-lg overflow-x-auto">
        <thead>
          <tr className="bg-green text-white">
              <th className="px-4 py-2 uppercase">SL</th>
              <th className="px-4 py-2 uppercase">Name</th>
              <th className="px-4 py-2 uppercase">Age</th>
              <th className="px-4 py-2 uppercase">City</th>
              <th className="px-4 py-2 uppercase">Address</th>
              <th className="px-4 py-2 uppercase">Phone</th>
              <th className="px-4 py-2 uppercase">Status</th>
              <th className="px-4 py-2 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((seller,index) => (
              <tr key={seller.id} className="text-center bg-gray-100">
                <td className="px-4 py-2 text-center text-black">{index+1}</td>
                <td className="px-4 py-2  text-center text-black">{seller.first_name} {seller.last_name}</td>
                <td className="px-4 py-2 text-center text-black">{seller.age || "N/A"}</td>
                <td className="px-4 py-2 text-center text-black">{seller.city_id}</td>
                <td className="px-4 py-2 text-center text-black">{seller.full_address}</td>
                <td className="px-4 py-2 text-center text-black">{seller.phone}</td>
                <td className="px-4 py-2 text-center text-black">{seller.status}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="px-4 py-2 bg-transparent text-gray-700 hover:bg-gray-300 rounded-lg flex items-center gap-2 transition"
                    onClick={() => handleViewDetails(seller)}
                  >
                    View <FaArrowRight className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seller Details</h2>
            <p><strong>Name:</strong> {selectedSeller.first_name} {selectedSeller.last_name}</p>
            <p><strong>Age:</strong> {selectedSeller.age || "N/A"}</p>
            <p><strong>Email:</strong> {selectedSeller.email}</p>
            <p><strong>Phone:</strong> {selectedSeller.phone}</p>
            <p><strong>Gender:</strong> {selectedSeller.gender}</p>
            <p><strong>Address:</strong> {selectedSeller.full_address}</p>
            <p><strong>Status:</strong> {selectedSeller.status}</p>
            <p><strong>Role:</strong> {selectedSeller.role}</p>
            
            {/* Close Button */}
            <button 
              onClick={closePopup} 
              className="mt-4 px-4 py-2 bg-green text-white rounded-lg hover:bg-main transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingSeller;
