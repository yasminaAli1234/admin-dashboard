import React from 'react';
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

const Page_selection_category = () => {
  const { type } = useParams(); // Destructure the 'type' from the URL parameters

  // Data for the category items
  const data = [
    { image: m1, title: "صيفي" },
    { image: m2, title: "شتوي" },
    { image: m3, title: "ربيعي" },
    { image: m4, title: "خريفي" },
    { image: m5, title: "نوم" },
    { image: m6, title: "محجبات" },
    { image: m7, title: "رياضي" },
  ];

  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar_category />
      <Category_type data={data} type={type}/>
    </div>
  );
};

export default Page_selection_category;
