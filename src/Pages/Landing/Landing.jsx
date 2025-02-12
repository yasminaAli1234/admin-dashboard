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


<div className="relative bg-gradient-to-b from-white to-green py-12">
  {/* Left Section: Image and Telephone */}
  <div className="flex justify-between items-center container mx-auto px-6">
    <div className="flex flex-col items-center w-[45%]">
      <div className="relative w-[300px] h-[550px]">
        {/* Outer Image (e.g., mobile phone) */}
        <img
          src={mobileImage} // Replace with the mobile image URL
          alt="Phone"
          className="w-full h-auto object-cover "
        />

        {/* Inner Image (e.g., app screen image) */}
        <img
          src={appImage} // Replace with the app image URL
          alt="App Screen"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
    <div className="flex flex-col absolute top-14 right-20 ">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">حمل تطبيق مرفأ الان</h3>
      <span className="text-xl font-semibold text-gray-600 mb-4">مِنك وليك</span>

      {/* Two images underneath */}
      <div className="flex justify-between gap-4">
  
      <img
    src={play} 
    alt="App Image"
    className="w-[250px] h-auto object-contain rounded-sm"
  />

  {/* Second image (app) */}
  <img
    src={app}
    alt="Play Store Image"
    className="w-[250px] h-auto object-contain rounded-sm"
  />
</div>

    </div>
  </div>

  {/* Footer Section */}
  <div className="absolute bottom-0 w-full bg-main text-white text-center py-6">
  <div className="container mx-auto ">
    <div className="flex justify-between  wrap">
      
      {/* Left Column: Contact Us */}
      <div className="flex flex-col items-end text-end md:items-start md:text-start">
        <h2 className="text-2xl font-bold mb-6">تواصل معنا</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-1">
          <span>email@example.com</span>
            <i className="fas fa-envelope ml-2"></i>
            
          </li>
          <li className="flex items-center gap-1 ">
          <span>1234 Street, City, Country</span>
            <i className="fas fa-map-marker-alt ml-2"></i>
            
          </li>
          <li className="flex items-center gap-1">
          <span>+1 (234) 567-890</span>
            <i className="fas fa-phone-alt ml-2"></i>
            
          </li>
        </ul>
      </div>
      
      {/* Middle Column: Location */}
      <div className="flex flex-col items-center text-end">
        <h2 className="text-2xl font-bold mb-6">الموقع</h2>
        <ul className="space-y-4">
          <li className="text-lg">المميزات</li>
          <li className="text-lg">التطبيق</li>
        </ul>
      </div>

      {/* Right Column: Image and Description */}
      <div className="flex flex-col items-end text-end">
        <img
          src={logoWhite} // Replace with actual image path
          alt="App Logo"
          className="w-[80px] h-auto object-contain mb-4"
        />
        <p className="text-base leading-6">
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
