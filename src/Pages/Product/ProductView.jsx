import React from "react";


const ProductView = ({ product, closePopup }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-2xl font-semibold">{product.product_name}</h2>
            <button 
              onClick={closePopup} 
              className=" 
              hover:text-main text-4xl transition duration-200"
            >
              &times;
            </button>
          </div>
      
          {/* Product Images */}
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.productImages?.images?.length > 0 ? (
              product.productImages.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img.image} 
                  alt="Product" 
                  className="w-24 h-24 rounded-lg object-cover border shadow-sm transition duration-200 hover:scale-105"
                />
              ))
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>
      
          {/* Product Details */}
          <div className="mt-4 space-y-2 text-gray-700">
            <p><strong>Category:</strong> {product.category.category_name}</p>
            <p><strong>Subcategory:</strong> {product.subCategory.subCategory_name}</p>
            <p><strong>Location:</strong> {product.product_location || "Not specified"}</p>
            <p><strong>Description:</strong> {product.product_description || "No description provided"}</p>
            <p><strong>Size:</strong> {product.product_size || "N/A"}</p>
            <p><strong>Price:</strong> <span className="text-green-600 font-bold">${product.product_price}</span></p>
            <p><strong>Quantity:</strong> {product.product_quantity}</p>
            <p><strong>Submission Date:</strong> {new Date(product.product_submission_date).toLocaleString()}</p>
            <p><strong>Seller:</strong> {product.user.user_name}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold 
                ${product.product_status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {product.product_status}
              </span>
            </p>
          </div>
      
          {/* Close Button */}
          <button 
            onClick={closePopup} 
            className="mt-5 w-full bg-green hover:bg-main text-white py-2 rounded-md font-medium transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
      
    );
  };
  
  export default ProductView;
  