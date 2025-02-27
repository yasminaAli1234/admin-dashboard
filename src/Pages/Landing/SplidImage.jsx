import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import home from '../../assets/home.jpg';
import category from '../../assets/category.jpg';
import multiChoice from '../../assets/multiChoise.jpg';
import login from '../../assets/login.jpg';
import sign from '../../assets/signup.jpg';
import add from '../../assets/add.jpg';

const images = [
  { src: home, title: "Explore Our World" },
  { src: category, title: "Browse by Category" },
  { src: multiChoice, title: "Multiple Choices, One Destination" },
  { src: login, title: "Login" },
  { src: sign, title: "Sign Up" },
  { src: add, title: "Add Your Favorites" },
];

const SplidImage = () => {
  return (
    <div className="relative w-full  py-10">
      <h2 className="text-4xl font-extrabold text-green text-center mb-10 tracking-wide drop-shadow-md">
        Discover More ✨
      </h2>

      <div className="max-w-7xl mx-auto">
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            focus: "center",
            autoplay: true,
            interval: 3000,
            speed: 800,
            gap: "1.5rem",
            arrows: true,
            pagination: false,
            pauseOnHover: true,
            drag: true,
            breakpoints: {
              1024: { perPage: 2 },
              768: { perPage: 1 },
            },
          }}
          className="overflow-hidden"
        >
          {images.map((item, index) => (
            <SplideSlide key={index}>
              <div className="relative  w-full h-full rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105">
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110 opacity-90"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                {/* Title Overlay */}
                <div className="absolute bottom-8 left-6 text-white text-2xl font-semibold tracking-wide transition-all duration-500 translate-y-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 drop-shadow-lg">
                  {item.title}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default SplidImage;
