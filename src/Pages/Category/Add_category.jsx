import React, { useEffect, useState } from 'react'
import Navbar_category from '../../components/Category_screen/Navbar_category'
import CategorySelection from '../../components/Category_screen/Category_selection'
import { useLocation } from 'react-router-dom';
import { useGet } from '../../Hooks/useGet';
import Loading from '../../components/Loading';

const Add_category = () => {
  const { state } = useLocation();
  const { items } = state || {}; // Get the items passed from the previous page


  const {refetch: refetchCategory,loading: loadingCategory,data: category,} = useGet({url: `https://marfaa-alex.com/api/admin/categories`,});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (items) {
      console.log("Received items:", items);
    }
  }, [items]);

    useEffect(() => {
      refetchCategory()
    }, [refetchCategory])
  
    useEffect(() => {
      if(category){
        setCategories(category.categories)
      }
      console.log("data category" , category)
    }, [category])

    if(loadingCategory){
      return <Loading/>
    }

  return (
    <div className='bg-white h-screen'>
      <Navbar_category />
      
      {/* Check if items exist before rendering CategorySelection */}
      {categories && categories.length > 0 ? (
        <CategorySelection items={categories} />
      ) : (
        <div className="text-center text-xl text-red-500 mt-8">
          No categories available. Please add categories.
        </div>
      )}
    </div>
  );
}

export default Add_category;
