import logo from '../../assets/iconpng.png';
import logoWhite from '../../assets/logo.png'
import image1 from '../../assets/adv1.jpg'
import image2 from '../../assets/adv2.jpg'
import image3 from '../../assets/adv3.jpg'
import image4 from '../../assets/adv4.jpg'
import appImage from '../../assets/content.png'
import mobileImage from '../../assets/tele.png'
import app from '../../assets/app.jpg'
import play from '../../assets/play.jpg'
import { useNavigate } from 'react-router-dom';
import SplidImage from './SplidImage';
import Cart from './Cart';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col">
   {/* Landing Section with Linear Gradient */}
<div className="bg-gradient-to-b from-green  to-white h-[450px] w-full flex flex-col items-center justify-center text-center relative overflow-hidden rounded-b-[100px]">
  
  {/* Logo - Larger size */}
  <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />

  {/* Paragraph */}
  <p className="text-black text-xl font-semibold px-6 sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto mb-6 leading-relaxed">
    تطبيق مبتكر يتيح عرض وإضافة منتجات مستعملة أو جديدة بأسعار رمزية، مما يوفر للأشخاص المحتاجين فرصة شراء سلع بجودة عالية، ويمنح الراغبين فرصة لمساعدة غيرهم بسهولة.
  </p>

  {/* Button */}
  <button className="mt-6 px-8 py-3 bg-green text-white rounded-lg text-lg transition duration-300 hover:bg-green-700 shadow-md">
    تحميل التطبيق
  </button>

  {/* Optional Background Text */}
  <span className="absolute bottom-6 text-black font-bold text-1xl">مِنك وليك</span>
</div>


      {/* Advantage Section */}
      <div className="advantage flex-grow bg-white py-12">
  <h2 className="text-3xl font-semibold text-center text-green mb-8">مميزات التطبيق</h2>

  {/* Flex container for boxes */}
  <div className="flex flex-wrap justify-center gap-0">
    {/* Box 1 */}
    <div className="flex flex-col items-center w-[250px]">
      <img
        src={image1} // Replace with actual image path
        alt="Feature 1"
        className="w-[120px] h-[120px] object-cover rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">نساهم في دعم</h3>
      <p className="text-gray-600 text-center">المؤسسات الخيرية</p>
    </div>

    {/* Box 2 */}
    <div className="flex flex-col items-center w-[250px]">
      <img
        src={image2} // Replace with actual image path
        alt="Feature 2"
        className="w-[120px] h-[120px] object-cover rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">دعم مستدام</h3>
      <p className="text-gray-600 text-center">عبر نظام عملي وهادف</p>
    </div>

    {/* Box 3 */}
    <div className="flex flex-col items-center w-[250px]">
      <img
        src={image3} // Replace with actual image path
        alt="Feature 3"
        className="w-[120px] h-[120px] object-cover rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">منتجات</h3>
      <p className="text-gray-600 text-center">ملابس، أحذيه ….</p>
    </div>

    {/* Box 4 */}
    <div className="flex flex-col items-center w-[250px]">
      <img
        src={image4} // Replace with actual image path
        alt="Feature 4"
        className="w-[120px] h-[120px] object-cover rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">أسعار رمزية</h3>
      <p className="text-gray-600 text-center">مناسبة لكل الفئات</p>
    </div>
  </div>
</div>
<div className="">
<SplidImage/>
</div>

<Cart/>

<div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green">
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
          src={appImage} 
          alt="App Screen"
          className="absolute top-0 left-0 w-full h-full object-contain  "
        />
      </div>
    </div>

    {/* Right Section: Text & Buttons */}
    <div className="flex flex-col text-center md:text-right mt-6 md:mt-0 w-full md:w-[50%]">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">حمل تطبيق مرفأ الان</h3>
      <span className="text-lg sm:text-xl font-semibold text-gray-600 mb-4">مِنك وليك</span>

      {/* Buttons */}
      <div className="flex justify-center md:justify-start gap-4 flex-wrap">
        <img src={play} alt="Play Store" className="w-[140px] sm:w-[180px] md:w-[220px] h-auto object-contain rounded-sm" />
        <img src={app} alt="App" className="w-[140px] sm:w-[180px] md:w-[220px] h-auto object-contain rounded-sm" />
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <div className="w-full bg-main text-white text-center py-6">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Left Column: Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">تواصل معنا</h2>
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
          <img src={logoWhite} alt="App Logo" className="w-[60px] sm:w-[80px] h-auto object-contain mb-4" />
          <p className="text-sm sm:text-base leading-6">
            تطبيق مبتكر يتيح عرض وإضافة منتجات مستعملة أو جديدة بأسعار رمزية.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>






    </div>
  );
};

export default Landing;
