import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3jpg.jpg';

const CategorySelection = ({items}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCategoryClick = (category) => {
    // Navigate to the respective category page
    navigate(`/page_selection/${category}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col gap-6 items-end w-3/5">
        <h2 className="text-center text-2xl font-bold text-black mb-6">اختر الفئة</h2>


        {items.map((category,index) => (
  <div
    key={index}
    className="relative w-full bg-gray2 h-20 cursor-pointer"
    onClick={() => handleCategoryClick(category.name)} // Pass category name on click
  >
    <img
      src={category.image} // Replace with actual image URL or dynamic data
      alt={category.name}
      className="w-full h-full object-cover rounded-lg"
    />
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
      <span className="text-white text-lg font-semibold">{category.name}</span>
    </div>
  </div>
))}
   
      </div>
    </div>
  );
};

export default CategorySelection;
