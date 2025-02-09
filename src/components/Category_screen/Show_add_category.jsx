import React, { useState, useEffect } from 'react';

const Show_add_category = ({ value, onClose, onAddCategory, previousImage }) => {
  const [image, setImage] = useState(previousImage || null); // Use previous image if provided
  const [subCategoryName, setSubCategoryName] = useState(value);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // Set the uploaded image
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (subCategoryName.trim() && image) {
      onAddCategory(subCategoryName, image);
      onClose(); // Close the popup after adding
    } else {
      alert("Please provide both subcategory name and an image!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-8 rounded-lg w-[90%] md:w-[50%] max-w-lg z-60 relative">
        <label htmlFor="categoryName" className="block text-lg font-semibold mb-4">
          SubCategory Name:
        </label>
        <input
          type="text"
          id="categoryName"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-200 outline-none mb-4"
          placeholder="Enter subcategory name"
        />
        <label htmlFor="categoryPhoto" className="block text-lg font-semibold mb-4">
          Photo:
        </label>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md mb-4">
          {image ? (
            <img src={image} alt="Subcategory" className="h-16 w-16 object-cover mr-4" />
          ) : (
            <p className="text-gray-500">No image selected</p>
          )}
          <input
            type="file"
            id="categoryPhoto"
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => document.getElementById("categoryPhoto").click()}
            className="bg-green text-white p-2 rounded-md"
          >
            Upload Image
          </button>
        </div>
        <button onClick={handleAddCategory} className="w-full bg-green text-white p-2 rounded-md mb-4">
          {value ? "Update" : "Add"}
        </button>
        <button
          onClick={onClose} // Close the popup when clicked
          className="absolute top-4 right-4 bg-green text-white p-2 "
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Show_add_category;
