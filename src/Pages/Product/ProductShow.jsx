import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDelete } from "../../Hooks/useDelete";
import { useAuth } from "../../Context/Auth";
import { FaArrowLeft } from "react-icons/fa";

const ProductShow = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.items; // Single product
  const productDetails = location.state?.productDetails; // All products
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const auth = useAuth();
  const navigate = useNavigate()
  const [allProduct, setAllProduct] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productDetails) {
      setAllProduct(productDetails); // Set all products
    }
  }, [productDetails]);

  if (!product) {
    return <p className="text-red-500">No product data found.</p>;
  }

  // Open Delete Modal
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

 // Confirm Delete with Reason
const confirmDelete = async () => {
    if (!deleteReason.trim()) {
      auth.toastError("Please enter a reason for deletion.");
      return;
    }
  
    try {
      const response = await fetch(
        `https://marfaa-alex.com/api/admin/product/delete/${selectedProduct?.id}`,
        {
          method: "DELETE", // Use DELETE method
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
          body: JSON.stringify({ delete_reason: deleteReason }), // Send the reason in the request body
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }
      navigate("/product");
  
      auth.toastSuccess(`${selectedProduct?.product_name} Deleted Successfully.`);
  
      setAllProduct(allProduct.filter((pro) => pro.id !== selectedProduct?.id));
    } catch (error) {
      auth.toastError("Error deleting product. Please try again.");
    }
  
    setIsDeleteModalOpen(false);
    setDeleteReason("");
  };
  

  const images = product.productImages?.images || [];

  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg">
      {/* Left: Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col items-start">
      <FaArrowLeft onClick={(()=>navigate(-1))} className="text-4xl mb-7 text-black cursor-pointer" />
        {/* <h2 className="text-lg text-green font-semibold mb-2">Product Images</h2> */}

        <div className="w-full flex flex-col gap-2">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="w-full h-[300px] border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={image.image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="w-[50%] h-[300px] border border-gray-300 rounded-md overflow-hidden">
              <img
                src="https://via.placeholder.com/500"
                alt="No image available"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-1/2 p-4">
        <p className="text-xs text-gray-500 mb-2">
          Product ID: <span className="font-semibold">{id}</span>
        </p>
        <label className="block font-semibold text-gray-700 mb-1">Product Name:</label>
        <input
          type="text"
          value={product.product_name}
          readOnly
          className="w-full p-2 border border-gray-300 text-black rounded-md bg-gray-200 mb-4"
        />

        <label className="block font-semibold text-gray-700 mb-1">Price:</label>
        <input
          type="text"
          value={`$${product.product_price}`}
          readOnly
          className="w-full p-2 border text-black border-gray-300 rounded-md bg-gray-200 mb-4"
        />

        <label className="block font-semibold text-gray-700 mb-1">Size:</label>
        <div className="flex gap-2 mb-4">
          {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
            <button
              key={size}
              className={`p-2 px-4 rounded-md ${
                product.product_size === size ? "bg-green text-white" : "bg-gray-200 text-black"
              }`}
              disabled
            >
              {size}
            </button>
          ))}
        </div>

        <label className="block font-semibold text-gray-700 mb-1">Location:</label>
        <input
          type="text"
          value={product.product_location}
          readOnly
          className="w-full p-2 border text-black border-gray-300 rounded-md bg-gray-200 mb-4"
        />

        <label className="block font-semibold text-gray-700 mb-1">Description:</label>
        <input
          type="text"
          value={product.product_description}
          readOnly
          className="w-full p-2 border text-black border-gray-300 rounded-md bg-gray-200 mb-4"
        />

        <div className="flex gap-4 items-center">
          <p className="text-black text-xl font-bold">Product status:</p>
          <button className="border border-green rounded-md bg-transparent p-2 font-bold text-green">
            {product.product_status}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4">
          <p className="text-black text-xl font-bold">Action</p>
          <div className="flex justify-between gap-3">
            <button className="bg-green  px-7 text-white p-2 rounded-md">Suspend</button>
            <button
              className="text-green p-2 text-xl rounded-md"
              onClick={() => handleDeleteClick(product)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2 text-black">Confirm Deletion</h2>
            <p className="text-gray-700">Enter the reason for deleting this product:</p>
            <textarea
              className="w-full border p-2 rounded mt-2 bg-gray-100"
              placeholder="Enter reason..."
              value={deleteReason}
              aria-live="3"
              onChange={(e) => setDeleteReason(e.target.value)}
            />
            <div className="flex justify-between items-center gap-3 mt-4">
            <button className="bg-green text-white font-bold px-4 py-2 rounded-md" onClick={confirmDelete}>
                Confirem
              </button>
              <button className="bg-transparent text-black font-bold px-4 py-2 rounded-md" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShow;
