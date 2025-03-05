import React from "react";
import { FaCheckCircle, FaLayerGroup, FaPlus, FaUser } from "react-icons/fa";

import home from "../../assets/home.jpg";
import category from "../../assets/cat.jpg";
import multiChoice from "../../assets/multiChoise.jpg";
import login from "../../assets/login.jpg";
import sign from "../../assets/signup.jpg";
import add from "../../assets/add.jpg";

const features = [
  { icon: <FaLayerGroup />, text: "تنظيم الفئات بسهولة" },
  { icon: <FaCheckCircle />, text: "خيارات متعددة وسهلة الوصول" },
  { icon: <FaUser />, text: "تجربة تسجيل دخول سلسة" },
  { icon: <FaPlus />, text: "إضافة المفضلات بنقرة واحدة" },
];

const images = [home, category, multiChoice, login, sign, add];

const SplidImage = () => {
  return (
    <section className="relative w-full py-20 px-6 bg-gradient-to-b from-green to-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Features & Highlights */}
        <div className="text-start md:text-right">
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            ✨ اكتشف أكثر  
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            استمتع بتجربة استخدام سلسة مع ميزاتنا الفريدة التي تجعل التنقل سهلاً وممتعًا!
          </p>
          
          <ul className="space-y-6">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center justify-center md:justify-end space-x-4 text-lg text-gray-700 transition-all duration-500 hover:scale-105"
              >
                <span className="text-green-600 text-2xl">{feature.icon}</span>
                <span className="font-semibold">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

   {/* Right Side - Creative Circular Image Layout */}
<div className="relative flex justify-center items-center">
  <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex justify-center items-center">
    {images.map((img, index) => {
      const angle = (index * 360) / images.length;
      const radius = 130; // Slightly increased for better spacing

      return (
        <div
          key={index}
          className="absolute w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden shadow-lg border-4 border-white transition-all duration-500 hover:scale-110"
          style={{
            transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
          }}
        >
          <img
            src={img}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      );
    })}

    {/* Center Image */}
    <div className="absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden shadow-xl border-4 border-white bg-white flex justify-center items-center">
      <img
        src={home}
        alt="Center"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  </div>
</div>


      </div>
    </section>
  );
};

export default SplidImage;
