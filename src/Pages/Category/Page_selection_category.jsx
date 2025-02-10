import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import m1 from '../../assets/m1.png';
import m2 from '../../assets/m2.png';
import m3 from '../../assets/m3.png';
import m4 from '../../assets/m4.png';
import m5 from '../../assets/m5.png';
import m6 from '../../assets/m6.png';
import m7 from '../../assets/m7.png';

import Navbar_category from '../../components/Category_screen/Navbar_category';
import Category_type from '../../components/Category_screen/Category_type';
import { useGet } from '../../Hooks/useGet';
import Loading from '../../components/Loading';

const Page_selection_category = () => {
  const { type } = useParams(); // Destructure the 'type' from the URL parameters
  const { data } = useParams(); // Destructure the 'type' from the URL parameters
  const { refetch: refetchSubCategory, loading: loadingSubCategory, data: subCategory } = useGet({
    url: `https://marfaa-alex.com/api/admin/subCategories`,
  });

  const [subCategories,setSubCategory] = useState([])

    
  useEffect(() => {
    refetchSubCategory();
  }, [refetchSubCategory]);

  useEffect(() => {
    if (subCategory) {
      setSubCategory(subCategory.subCategories);
    }
  }, [subCategory]);

  

  // Data for the category items
  // const data = [
  //   { image: m1, title: "صيفي" },
  //   { image: m2, title: "شتوي" },
  //   { image: m3, title: "ربيعي" },
  //   { image: m4, title: "خريفي" },
  //   { image: m5, title: "نوم" },
  //   { image: m6, title: "محجبات" },
  //   { image: m7, title: "رياضي" },
  // ];

  if(loadingSubCategory){
    return <Loading/>
  }

  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar_category />
      <Category_type data={subCategories} type={type} category= {data}/>
    </div>
  );
};

export default Page_selection_category;
