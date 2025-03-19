import logo from "../../assets/iconpng.png";
import logoWhite from "../../assets/logo.png";
import image1 from "../../assets/adv1.jpg";
import image2 from "../../assets/adv2.jpg";
import image3 from "../../assets/adv3.jpg";
import image4 from "../../assets/adv4.jpg";

import m1 from "../../assets/m1.png";
import m2 from "../../assets/m2.png";
import m3 from "../../assets/m3.png";
import m4 from "../../assets/m4.png";
import m5 from "../../assets/m5.png";

import appImage from "../../assets/content.png";
import mobileImage from "../../assets/tele.png";
import app from "../../assets/app.jpg";
import play from "../../assets/play.jpg";
import { Link, useNavigate } from "react-router-dom";
import SplidImage from "./SplidImage";
import Cart from "./Cart";
import fav from "../../assets/favorite.jpg";
import lan from "../../assets/lan.jpg";
import content from "../../assets/content.png";
import home from "../../assets/home.jpg";
import Google from "../../assets/Google";
import App from "../../assets/App";
import Cloth from "../../assets/cloth";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
const Landing = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("marfa");
  const [menuOpen, setMenuOpen] = useState(false);
  const images = [m1, m2, m3, m4, m5];
  const [activeIndex, setActiveIndex] = useState(1);
  const sections = [
    { id: "download", name: "حمل التطبيق" },
    { id: "categories", name: "اقسام التطبيق" },
    { id: "discover", name: "اكتشف اكثر" },
    { id: "features", name: "مميزات التطبيق" },
    { id: "marfa", name: "مرفأ" },
  ];

  // Scroll to section when clicked
  const scrollToSection = (id) => {
    setActiveLink(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="">
      <header className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-10 py-4 flex justify-between items-center">
          {/* Left: Logo */}
          <img src={logo} alt="Logo" className="w-10 h-auto" />

          {/* Right: Navigation Links (Hidden on Small Screens) */}
          <nav className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative text-lg p-3 font-bold  hover:text-main transition ${
                  activeLink === section.id
                    ? "text-main font-bold"
                    : "text-gray-600"
                }`}
              >
                {section.name}
                {activeLink === section.id && (
                  <span className="absolute  left-0 bottom-0 w-full h-[2px] bg-green"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-green text-white shadow-md py-2">
            <ul className="flex flex-col space-y-2 text-center">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`block py-2 text-lg ${
                      activeLink === section.id
                        ? "text-main font-bold"
                        : "text-white"
                    }`}
                  >
                    {section.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>{" "}
      <div className=" mt-10 flex flex-col">
        {/* Landing Section with Linear Gradient */}
        <div
          id="marfa"
          className="bg-gradient-to-b mt-10 from-green to-white h-[450px] w-full flex flex-col lg:flex-row items-center justify-between text-center lg:text-right relative overflow-hidden rounded-b-[100px] px-20"
        >
          {/* Left Side - Image */}
          <div className="flex justify-start lg:w-1/2">
  <img
    src={lan}
    alt="Logo"
    className="w-40 h-40 lg:w-48 lg:h-60 mb-8 lg:mb-0 rounded-t-full"
    style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
  />
</div>


          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex flex-col items-end text-right">
            {/* Logo - Optional if needed */}
            <img
              src={logo}
              alt="Logo"
              className="w-40 h-40 lg:w-48 lg:h-48 mb-4 hidden lg:block"
            />

            {/* Paragraph */}
            <p className="text-black text-xl font-semibold px-6 sm:w-[70%] md:w-[60%] lg:w-[80%] leading-relaxed">
              تطبيق مبتكر يتيح عرض وإضافة منتجات مستعملة أو جديدة بأسعار رمزية،
              مما يوفر للأشخاص المحتاجين فرصة شراء سلع بجودة عالية، ويمنح
              الراغبين فرصة لمساعدة غيرهم بسهولة.
            </p>

            {/* Button & Text - Flex Layout */}
            <div className="flex flex-col gap-7 sm:flex-row items-center justify-end w-full mt-4">
              {/* Optional Background Text */}
              <span className="text-gray-500 font-bold text-xl">مِنك وليك</span>

              <Link
                to="https://play.google.com/store/apps/details?id=com.app.marfa"
                className="px-8 py-3 bg-main text-white rounded-full text-lg transition duration-300 hover:bg-green-700 shadow-md text-center mb-4 sm:mb-0 sm:mr-4"
              >
                تحميل التطبيق
              </Link>
            </div>
          </div>
        </div>

        {/* Advantage Section */}
        <div id="features" className="advantage flex-grow bg-white py-12">
          <h2 className="text-3xl font-semibold text-center text-green mb-8">
            مميزات التطبيق
          </h2>

          {/* Flex container for boxes */}
          <div className="flex flex-wrap justify-center gap-0">
            {/* Box 1 */}
            <div className="flex flex-col items-center w-[250px]">
              <img
                src={image1} // Replace with actual image path
                alt="Feature 1"
                className="w-[120px] h-[120px] object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                نساهم في دعم
              </h3>
              <p className="text-gray-600 text-center">المؤسسات الخيرية</p>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center w-[250px]">
              <img
                src={image2} // Replace with actual image path
                alt="Feature 2"
                className="w-[120px] h-[120px] object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                دعم مستدام
              </h3>
              <p className="text-gray-600 text-center">عبر نظام عملي وهادف</p>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center w-[250px]">
              <img
                src={image3} // Replace with actual image path
                alt="Feature 3"
                className="w-[120px] h-[120px] object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                منتجات
              </h3>
              <p className="text-gray-600 text-center">ملابس، أحذيه ….</p>
            </div>

            {/* Box 4 */}
            <div className="flex flex-col items-center w-[250px]">
              <img
                src={image4} // Replace with actual image path
                alt="Feature 4"
                className="w-[120px] h-[120px] object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                أسعار رمزية
              </h3>
              <p className="text-gray-600 text-center">مناسبة لكل الفئات</p>
            </div>
          </div>
        </div>

        {/* New Section Below - Image Slider & Features */}
        <div
          id="discover"
          className="w-full flex flex-col lg:flex-row items-center justify-between px-20 mt-12 bg-gradient-to-b from-white to-green"
        >
          {/* Left Side - Image Slider */}
          <div className="lg:w-1/2 rounded-xl p-4">
            <Splide
              options={{
                type: "loop",
                perPage: 1,
                autoplay: true,
                interval: 3000,
                pagination: true,
                arrows: true,
              }}
              className="w-[60%] lg:w-[40%]"
            >
              <SplideSlide>
                <img
                  src={home}
                  alt="Feature 1"
                  className="rounded-xl shadow-lg w-full h-[300px] object-contain"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={content}
                  alt="Feature 2"
                  className="rounded-xl shadow-lg w-full h-[300px] object-contain"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src={fav}
                  alt="Feature 3"
                  className="rounded-xl shadow-lg w-full h-[300px] object-contain"
                />
              </SplideSlide>
            </Splide>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex flex-col p-2 items-end text-right">
            <h2 className="text-4xl font-bold text-main mb-4">اكتشف أكثر</h2>
            <p className="text-1xl font-bold text-gray-800 mt-4 mb-4">
              استمتع بتجربة استخدام سلسة مع ميزاتنا الفريدة التي تجعل التنقل!
              سهلاً وممتعًا
            </p>
            <ul className="text-lg text-black font-semibold space-y-3 px-6">
              <li>✅ تنظيم الفئات بسهولة</li>
              <li>✅ تجربة تسجيل دخول سلسة</li>
              <li>✅ إضافة المفضلات بنقرة واحدة</li>
              <li>✅ شحن سريع وآمن لجميع الطلبات</li>
              <li>✅ مدفوعات آمنة 100% ومحمية</li>
              <li>✅ عروض وخصومات حصرية لك</li>
            </ul>
          </div>
        </div>

        {/* New Splide Row with 5 Images */}

        <div
          id="categories"
          className="mt-10 mb-5 w-full flex flex-col items-center"
        >
          <Splide
            options={{
              type: "loop", // Enable looping
              perPage: 3,
              autoplay: false,
              pagination: false,
              arrows: true,
              gap: "20px",
              breakpoints: {
                1024: { perPage: 2 },
                768: { perPage: 1 },
              },
            }}
            onMove={(splide) => setActiveIndex(splide.index)}
            className="w-full max-w-6xl px-6"
          >
            {images.map((image, index) => (
              <SplideSlide key={index} className="flex flex-col items-center">
                {/* Image Container */}
                <div
                  className={`relative bg-white rounded-lg shadow-lg p-3 flex flex-col items-center w-56 md:w-64 lg:w-72 transition-all duration-300 ${
                    index === activeIndex ? "scale-110" : "scale-100"
                  }`}
                >
                  {/* Image Wrapper */}
                  <div className="relative w-full h-[180px] rounded-lg overflow-hidden group">
                    <img
                      src={image}
                      alt={`Item ${index + 1}`}
                      className="rounded-lg w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />

                    {/* Overlay with Centered Text (Shows on Hover) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h2 className="text-2xl font-bold text-white">ملابس</h2>
                    </div>
                  </div>

                  {/* Button (Larger & Main for Center Image) */}
                  <Link
                    to="https://play.google.com/store/apps/details?id=com.app.marfa"
                    className={`mt-3 px-6 py-2 text-sm font-semibold border-2 rounded-lg transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-main text-white border-main px-8 py-3 text-lg"
                        : "bg-transparent text-main border-main hover:bg-main hover:text-white"
                    }`}
                  >
                    اكتشف
                  </Link>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        <div
          id="download"
          className="flex mt-10 flex-col min-h-screen bg-gradient-to-b from-white to-green"
        >
          {/* Container */}

          <div className="flex flex-grow flex-col-reverse gap-3 md:flex-row justify-between items-center container mx-auto px-6">
            {/* Left Section: Image and Telephone */}
            <div className="flex flex-col items-center w-full md:w-[45%]">
              <div className="relative w-[90%] max-w-[300px] h-auto ">
                <img
                  src={mobileImage}
                  alt="Phone"
                  className="w-full h-auto object-contain"
                />
                <img
                  src={home}
                  alt="App Screen"
                  className="absolute top-0 left-0 w-full h-full object-contain  "
                />
              </div>
            </div>

            {/* Right Section: Text & Buttons */}
            <div className="flex flex-col text-center md:text-right mt-6 md:mt-0 w-full md:w-[50%]">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                حمل تطبيق مرفأ الان
              </h3>
              <span className="text-lg sm:text-xl font-semibold text-gray-600 mb-4">
                مِنك وليك
              </span>

              {/* Buttons */}
              {/* Buttons */}
              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-center md:justify-start gap-2">
                <Link
                  to="https://play.google.com/store/apps/details?id=com.app.marfa"
                  className=" scale-90 md:scale-100"
                >
                  <Google />
                </Link>
                <Link
                  to="https://play.google.com/store/apps/details?id=com.app.marfa"
                  className=" scale-90 md:scale-100"
                >
                  <App />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="w-full bg-main  text-white text-center py-6">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
                {/* Left Column: Contact */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    تواصل معنا
                  </h2>
                  <ul className="space-y-2 sm:space-y-4">
                    <li className="flex items-center justify-center md:justify-start gap-1">
                      <i className="fas fa-envelope"></i>
                      <span>email@example.com</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-1">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>1234 Street, City, Country</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-1">
                      <i className="fas fa-phone-alt"></i>
                      <span>+1 (234) 567-890</span>
                    </li>
                  </ul>
                </div>

                {/* Middle Column: Navigation */}
                <div className="flex flex-col items-center w-full md:w-1/3">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">الموقع</h2>
                  <ul className="space-y-2 sm:space-y-4">
                    <li className="text-lg">المميزات</li>
                    <li className="text-lg">التطبيق</li>
                  </ul>
                </div>

                {/* Right Column: Logo & Description */}
                <div className="flex flex-col items-center w-full md:w-1/3">
                  <img
                    src={logoWhite}
                    alt="App Logo"
                    className="w-[60px] sm:w-[80px] h-auto object-contain mb-4"
                  />
                  <p className="text-sm sm:text-base leading-6">
                    تطبيق مبتكر يتيح عرض وإضافة منتجات مستعملة أو جديدة بأسعار
                    رمزية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
