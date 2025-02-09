import React, { useEffect } from 'react'
import Navbar_category from '../../components/Category_screen/Navbar_category'
import CategorySelection from '../../components/Category_screen/Category_selection'
import { useLocation } from 'react-router-dom';

const Add_category = () => {
  const { state } = useLocation();
  const { items } = state || {}; // Get the items passed from the previous page

  useEffect(() => {
    if (items) {
      console.log("Received items:", items);
    }
  }, [items]);

  return (
    <div className='bg-white h-screen'>
      <Navbar_category />
      
      {/* Check if items exist before rendering CategorySelection */}
      {items && items.length > 0 ? (
        <CategorySelection items={items} />
      ) : (
        <div className="text-center text-xl text-red-500 mt-8">
          No categories available. Please add categories.
        </div>
      )}
    </div>
  );
}

export default Add_category;
