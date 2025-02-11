import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShareCategory from '../../Pages/Category/Share_category';

const Category_type = ({ data,type,id }) => {
  console.log("Received props in Category_type:", type, id);

  const navigate = useNavigate();

  const handle_navigate = (item, image_category, item_sub) => {
    navigate('/share_category', { state: { item, type, image_category, id, item_sub } });
  };

  return (
    <div className=" mt-20 relative p-20 bg-gray-100 h-screen rounded-lg shadow-md">
      {/* Header and selected category (top-right) */}
      <div className="absolute top-6 right-6">
        <h1 className="text-3xl font-bold text-black">اختار الفئة الفرعية</h1>
        <span className=" flex justify-end text-black text-2xl font-semibold mt-1 ">:{type}</span>
      </div>

      {/* Category Items */}
      <div className="mt-16 grid grid-cols-1 gap-6">
        {/* Loop through data array to display items */}
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-200 text-black p-2 rounded-lg cursor-pointer"
            onClick={()=>handle_navigate(item.name,item.image,item)}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={`Category ${item.name}`}
              className="w-14 h-14 object-cover rounded-lg bottom-0"
            />

            {/* Text */}
            <span className="text-lg font-semibold">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category_type;
