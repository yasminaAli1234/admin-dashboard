import React, { useEffect, useState } from "react";

const Active_Product = () => {
  const [products, setProducts] = useState([]);

  // Example of an API call to fetch active product data (replace with your actual API endpoint)
  useEffect(() => {
    // Simulate an API response (replace with your API call)
    const fetchProducts = async () => {
      // Replace with your API call
      const data = [
        { id: 1, customerName: "John Doe", type: "Electronics", amount: "$500", submissionTime: "2024-12-15 10:00", status: "Active" },
        { id: 2, customerName: "Jane Smith", type: "Clothing", amount: "$200", submissionTime: "2024-12-16 11:30", status: "Active" },
      ];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Active Product:</h1>

      {/* Wrap the table in a div with overflow-x-auto for horizontal scroll */}
      <div className="overflow-x-auto">
        {/* Table Structure */}
        <table className="min-w-full table-auto rounded-lg overflow-x-auto">
          <thead>
            <tr className="bg-green text-white">
              <th className="px-4 py-2 uppercase">Product No</th>
              <th className="px-4 py-2 uppercase">Customer Name</th>
              <th className="px-4 py-2 uppercase">Type</th>
              <th className="px-4 py-2 uppercase">Amount</th>
              <th className="px-4 py-2 uppercase">Submission Time</th>
              <th className="px-4 py-2 uppercase">Status</th>
              <th className="px-4 py-2 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="text-center bg-gray-100"
              >
                <td className="px-4 py-2 text-black">{product.id}</td>
                <td className="px-4 py-2 text-black">{product.customerName}</td>
                <td className="px-4 py-2 text-black">{product.type}</td>
                <td className="px-4 py-2 text-black">{product.amount}</td>
                <td className="px-4 py-2 text-black">{product.submissionTime}</td>
                <td className="px-4 py-2 text-black">{product.status}</td>
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

export default Active_Product;
