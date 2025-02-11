import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3jpg.jpg';

const CategorySelection = ({items}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCategoryClick = (category,id) => {
    // Navigate to the respective category page
    navigate(`/page_selection/${category}/${id}`);
  };

  return (
<div className="flex items-center justify-center min-h-screen p-6">
  <div className="w-full max-w-5xl">
    <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">اختر الفئة</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((category, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md transition-transform transform hover:scale-105"
          onClick={() => handleCategoryClick(category.name,category.id)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover rounded-xl transition-opacity group-hover:opacity-80"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
            <span className="text-white text-lg font-semibold">{category.name}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default CategorySelection;
