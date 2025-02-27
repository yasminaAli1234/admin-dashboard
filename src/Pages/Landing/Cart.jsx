import React from "react";
import cart from '../../assets/cart.jpg';
import checkout from '../../assets/checkOut.jpg';
import favorite from '../../assets/favorite.jpg';
import { Link } from "react-router-dom";

const cartImages = [cart, checkout, favorite];

const Cart = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen  p-6">
      {/* Cart Header */}
      <h2 className="text-4xl font-extrabold text-green mb-10 tracking-wide drop-shadow-lg">
        Your Cart <span className="text-green">🛒</span>
      </h2>

      {/* Grid Container for Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {cartImages.map((img, index) => (
          <div
            key={index}
            className="relative  w-full h-full rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105"
          >
            {/* Glassmorphic Card */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg transition-all duration-500 group-hover:shadow-2xl" />

            {/* Image */}
            <img
              src={img}
              alt={`Cart Item ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 opacity-90"
            />

            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
  <Link to="https://play.google.com/store/apps/details?id=com.app.marfa">
  <button className="mt-12 px-10 py-4 bg-gradient-to-r from-green to-green text-white font-bold text-lg rounded-full shadow-lg transition-all transform hover:scale-110 hover:from-green-600  active:scale-95">
        Proceed to Checkout
      </button>
  </Link>
    </div>
  );
};

export default Cart;
