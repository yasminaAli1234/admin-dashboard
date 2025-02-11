import React, { useEffect, useState } from "react";

const Active_Product = ({data}) => {

  const [selectedProduct, setSelectedProduct] = useState(null);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Active Product:</h1>

      {/* Wrap the table in a div with overflow-x-auto for horizontal scroll */}
      <div className="overflow-x-auto">
        {/* Table Structure */}
             {/* Table */}
      <table className="min-w-full table-auto rounded-lg overflow-x-auto">
        <thead>
          <tr className="bg-green text-white">
            <th className="px-4 py-2 uppercase">Product No</th>
            <th className="px-4 py-2 uppercase">Name</th>
            <th className="px-4 py-2 uppercase">Price</th>
            <th className="px-4 py-2 uppercase">Quantity</th>
            <th className="px-4 py-2 uppercase">Status</th>
            <th className="px-4 py-2 uppercase">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
            <tr key={product.id} className="text-center bg-gray-100">
              <td className="px-4 py-2 text-black">{product.id}</td>
              <td className="px-4 py-2 text-black">{product.name}</td>
              <td className="px-4 py-2 text-black">{product.price} $</td>
              <td className="px-4 py-2 text-black">{product.quantity}</td>
              <td className="px-4 py-2 text-black">{product.status}</td>
              <td className="px-4 py-2 text-black">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-4 py-2 bg-transparent text-gray-700 hover:bg-gray-300 rounded-lg transition duration-200 ease-in-out flex items-center gap-2"
                >
                  View
                  <i className="fa-solid fa-arrow-right text-xl"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Viewing Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <p><strong>Price:</strong> {selectedProduct.price} $</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Location:</strong> {selectedProduct.location}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Active_Product;
