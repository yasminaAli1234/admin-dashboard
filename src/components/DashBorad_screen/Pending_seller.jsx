import React, { useEffect, useState } from "react";

const Pending_seller = () => {
  const [sellers, setSellers] = useState([]);

  // Example of an API call to fetch seller data (use this with your actual API endpoint)
  useEffect(() => {
    // Simulate an API response (replace with your API call)
    const fetchSellers = async () => {
      // Replace with your API call
      const data = [
        { id: 1, name: "John Doe", gov: "Cairo", submissionTime: "2024-12-15 10:00", status: "Pending" },
        { id: 2, name: "Jane Smith", gov: "Alexandria", submissionTime: "2024-12-16 11:30", status: "Pending" },
      ];
      setSellers(data);
    };
    fetchSellers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold mb-6 text-black">Pending Seller:</p>

      {/* Wrap the table in a div with overflow-x-auto for horizontal scrolling */}
      <div className="overflow-x-auto">
        {/* Table Structure */}
        <table className="min-w-full table-auto rounded-lg overflow-x-auto">
          <thead>
            <tr className="bg-green text-white">
              <th className="px-4 py-2 uppercase">Seller ID</th>
              <th className="px-4 py-2 uppercase">Seller Name</th>
              <th className="px-4 py-2 uppercase">Gov.</th>
              <th className="px-4 py-2 uppercase">Submission Time</th>
              <th className="px-4 py-2 uppercase">Status</th>
              <th className="px-4 py-2 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="text-center bg-gray-100"
              >
                <td className="px-4 py-2 text-black">{seller.id}</td>
                <td className="px-4 py-2 text-black">{seller.name}</td>
                <td className="px-4 py-2 text-black">{seller.gov}</td>
                <td className="px-4 py-2 text-black">{seller.submissionTime}</td>
                <td className="px-4 py-2 text-black">{seller.status}</td>
                <td className="px-4 py-2 text-black">
                  <button className="px-4 py-2 bg-transparent text-gray-700 hover:bg-gray-300 rounded-lg transition duration-200 ease-in-out flex items-center gap-2">
                    View
                    <i className="fa-solid fa-arrow-right text-xl"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending_seller;
