import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaLock, FaTags, FaCheckCircle } from "react-icons/fa";
import cart from "../../assets/cart.jpg";
import checkout from "../../assets/checkOut.jpg";
import favorite from "../../assets/favorite.jpg";

const cartImages = [cart, checkout];

const Cart = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full min-h-screen p-10 gap-14 bg-white">
      
      {/* Left Section - Advantages */}
      <div className="w-full p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl text-black font-extrabold text-green-700 tracking-wide drop-shadow-md mb-6">
          <span className="text-black">🛒</span> عربة التسوق  
        </h2>

        <div className="space-y-5">
          {[
            { icon: <FaShippingFast />, text: "شحن سريع وآمن لجميع الطلبات" },
            { icon: <FaLock />, text: "مدفوعات آمنة 100% ومحمية" },
            { icon: <FaTags />, text: "عروض وخصومات حصرية لك" },
            { icon: <FaCheckCircle />, text: "منتجات مضمونة بأفضل جودة" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-lg">
              <span className="text-green text-2xl">{item.icon}</span>
              <p className="text-gray-800 font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Checkout Button */}
        <Link
          to="https://play.google.com/store/apps/details?id=com.app.marfa"
          className="mt-6 px-6 py-3 bg-green text-white rounded-xl text-lg font-semibold transition duration-300 hover:bg-green-700 shadow-md text-center block"
        >
          اكتشف الان
        </Link>
      </div>

      {/* Right Section - Creative Stacked Images */}
      <div className="columns-2 md:columns-3 gap-4 p-4">
  {cartImages.map((img, index) => (
    <div
      key={index}
      className="mb-4 rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-transform duration-500 hover:scale-105"
    >
      <img
        src={img}
        alt={`Cart Image ${index + 1}`}
        className="w-full h-auto object-cover rounded-2xl"
      />
    </div>
  ))}
</div>






    </div>
  );
};

export default Cart;
