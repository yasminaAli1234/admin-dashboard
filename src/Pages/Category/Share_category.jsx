import React, { useState, useRef, useEffect } from "react";
import Navbar_category from "../../components/Category_screen/Navbar_category";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";

const ShareCategory = () => {
  const [image, setImage] = useState(null); // State to store uploaded image
  const uploadRef = useRef(null); // Reference for file input

  const location = useLocation();
  const { item, type, image_category } = location.state; // Retrieve the state data
  const [selectedValue, setSelectedValue] = useState(""); // State to store selected value
  const [selectedButton, setSelectedButton] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState('');
  const [value, setValue] = useState(0); // Initial value is set to 0
  const [productPrice, setProductPrice] = useState("");
  const [productAddress, setProductAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [items, setItems] = useState([]); // Array to store items
  const [loading, setLoading] = useState(false); 
  const [id,setId] = useState(0);


  const {toastError,toastSuccess } = useAuth();
  // Function to increase the value by 1
//   const handleIncrease = () => setValue(value + 1);
//   const handleDecrease = () => setValue(value - 1);

  // Load the stored value from localStorage when the component mounts
  useEffect(() => {
    const storedValue = localStorage.getItem("categorySelection");
    if (storedValue) {
      setSelectedValue(storedValue);
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     const savedImage = localStorage.getItem("uploadedImage");
  //     if (savedImage) {
  //       setImage(savedImage);
  //     }
  //   };
  // }, []);

  // Effect to load the selected value from localStorage on component mount
  // useEffect(() => {
  //   const savedButton = localStorage.getItem("selectedButton");
  //   if (savedButton) {
  //     setSelectedButton(savedButton);
  //   }
  // }, []);

  // Handle change in select input
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem("categorySelection", value); // Store the selected value in localStorage
  };

  // Handle file input change and convert to base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image as base64 string
        localStorage.setItem("uploadedImage", reader.result);
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  // Trigger the file input when clicking the "تغير" text
  const triggerFileInput = () => {
    uploadRef.current.click();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setProductTitle(e.target.value); // Store the input value
  };
  // Handle input change
  const handleInputChange_des = (e) => {
    setProductDescription(e.target.value); // Store the input value
  };
    // Handle input change
    const handleInputChange_price = (e) => {
        setProductPrice(e.target.value); // Store the input value
      };
        // Handle input change
  const handleInputChange_address = (e) => {
    setProductAddress(e.target.value); // Store the input value
  };
  
  // Handle button click
  const handleClick = (value) => {
    setSelectedButton(value); // Set the selected button value
    localStorage.setItem("selectedButton", value); // Store in localStorage
  };
  const navigate = useNavigate();

  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate all inputs
    if (!type) {
      toastError("يرجى اختيار نوع المنتج");
      return;
    }
    
    if (!item) {
      toastError("يرجى اختيار العنصر");
      return;
    }
    
    if (!selectedValue) {
      toastError("يرجى اختيار القيمة");
      return;
    }
    
    if (!selectedButton) {
      toastError("يرجى اختيار الزر");
      return;
    }
    
    if (!productTitle) {
      toastError("يرجى إدخال عنوان المنتج");
      return;
    }
    
    if (!productDescription) {
      toastError("يرجى إدخال وصف المنتج");
      return;
    }
    
    if (!productPrice) {
      toastError("يرجى إدخال سعر المنتج");
      return;
    }
    
    if (!productAddress) {
      toastError("يرجى إدخال عنوان المنتج");
      return;
    }
    
    if (value <= 0) {
      toastError("القيمة يجب أن تكون أكبر من صفر");
      return;
    }
  
    // Set loading to true when submitting
    setLoading(true);
  
    // Simulate a 3-second delay before proceeding
    setTimeout(() => {
      // Create a new item object
      const newItem = {

        type,
        item,
        selectedValue,
        selectedButton,
        productTitle,
        productDescription,
        productPrice,
        productAddress,
        value,
        image,
        status:"Completed",
      };
  
      // Optionally save to localStorage
      const existingItems = JSON.parse(localStorage.getItem("categoryItems")) || [];
      localStorage.setItem("categoryItems", JSON.stringify([...existingItems, newItem]));

      toastSuccess("Added successful")
  
      // Navigate to the "Category" page with the new data
      navigate("/product", { state: { items: [...existingItems, newItem] } });
  
      // Reset loading state after 3 seconds
      setLoading(false);
    }, 3000); // 3 seconds delay
  };

  // Reset form fields
  const resetForm = () => {
    setImage(null);
    setSelectedValue("");
    setSelectedButton("");
    setProductTitle("");
    setProductDescription("");
    setProductPrice("");
    setProductAddress("");
    setValue(0);
  };
  

  return (
    <div className="flex flex-col bg-white h-fit">
      {/* Navbar */}
      <Navbar_category />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between relative top-[80px] p-4 gap-3 bg-white">
        {/* Left Part: Box 400x450 */}
        <div
          className="w-full md:w-[500px] h-[480px] bg-gray2 rounded-lg flex justify-center items-center cursor-pointer mb-6 md:mb-0 md:ml-10"
          // Trigger file input on click
        >
          {image ? (
            // Display the uploaded image
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              // Clicking the image also allows selecting a new one
            />
          ) : (
            // Default content when no image is uploaded
            <div
              onClick={triggerFileInput}
              className="bg-main text-white p-4 rounded-lg w-40 flex justify-center items-center"
            >
              <span className="text-center cursor-pointer">اضف صورة</span>
            </div>
          )}
        </div>

        {/* Category Information */}

<form
onSubmit={handleSubmit}
className="flex flex-col items-end md:w-[70%]  bg-white px-4 rounded-lg space-y-0.2 gap-2">
  {/* First step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:الفئة</h2>
    <div className="flex justify-between items-start bg-gray-100 w-full p-3 rounded-md">
      <p onClick={triggerFileInput} className="text-green ml-4 cursor-pointer">
        تغير
      </p>
      <div className="flex items-center">
        <div className="flex flex-col mr-4">
          <p className="font-semibold text-lg text-black">{type}</p>
          <p className="text-lg text-black">{item}</p>
        </div>
        <div>
          <img
            src={image_category}
            alt="Icon"
            className="w-[40px] h-[40px] object-cover "
          />
        </div>
      </div>
    </div>
  </div>

  {/* 2nd Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:النوع</h2>
    <select
      value={selectedValue}
      onChange={handleChange}
      className="bg-gray-100 text-black outline-none p-2 rounded-md w-full pr-8"
    >
      <option value="" disabled>اختر</option>
      <option value="رجالي">رجالي</option>
      <option value="حريمي">حريمي</option>
      <option value="اخر">اخر</option>
    </select>
  </div>

  {/* 3rd Step */}
  <div className="flex flex-col items-end w-full ">
    <h2 className="text-2xl text-black font-semibold mb-2">:الحالة</h2>
    <div className="flex space-x-2 justify-end items-end w-full">
      <button
      type="button"
        onClick={() => handleClick("مستعمل")}
        className={`px-4 py-1 rounded-md border-none ${
          selectedButton === "مستعمل"
            ? "bg-green text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        مستعمل
      </button>
      <button
      type="button"
        onClick={() => handleClick("مستعمل كالجديد")}
        className={`px-4 py-1 rounded-md border-none ${
          selectedButton === "مستعمل كالجديد"
            ? "bg-green text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        مستعمل كالجديد
      </button>
      <button
      type="button"
        onClick={() => handleClick("جديد")}
        className={`px-4 py-1 rounded-md border-none ${
          selectedButton === "جديد"
            ? "bg-green text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        جديد
      </button>
    </div>
  </div>

  {/* 4th Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:عنوان المنتج</h2>
    <input
      type="text"
      value={productTitle}
      onChange={handleInputChange}
      placeholder="ادخل عنوان المنتج"
      dir="rtl"
      className="bg-transparent text-black  w-full p-2 rounded-md border outline-none caret-black"
    />
  </div>

  {/* 5th Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:وصف المنتج</h2>
    <textarea
      value={productDescription}
      onChange={handleInputChange_des}
      placeholder="اكتب وصف المنتج"
      rows="3"
      dir="rtl"
      className="bg-transparent text-black resize-none  w-full p-2 rounded-md border outline-none caret-black"
    />
  </div>

  {/* 6th Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:السعر</h2>
    <input
      type="text"
      value={productPrice}
      onChange={handleInputChange_price}
      placeholder="100-200 جنيه مصري"
      dir="rtl"
      className="bg-transparent text-black  w-full p-2 rounded-md border outline-none caret-black"
    />
  </div>

  {/* 7th Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:العنوان</h2>
    <textarea
      value={productAddress}
      onChange={handleInputChange_address}
      placeholder="اكتب العنوان"
      dir="rtl"
      rows="2"
     className="bg-transparent text-black resize-none  w-full p-2 rounded-md border outline-none caret-black"
    />
  </div>

  {/* 8th Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:عدد القطع</h2>
    <div className="flex items-center w-full ">
      <button
      type="button"
        onClick={()=>setValue(pre=>pre-1)}
        className="bg-gray2 text-black px-4 py-2 rounded-l-md  hover:bg-gray2"
      >
        -
      </button>
      <span className="px-6 py-2 text-lg text-black">{value}</span>
      <button
      type="button"
        onClick={()=>setValue(pre=>pre+1)}
        className="bg-gray2 text-black px-4 py-2 rounded-r-md hover:bg-gray2"
      >
        +
      </button>
    </div>
  </div>
  {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

  {/* Submit Button */}
  <button
    onSubmit={handleSubmit}
    type="submit"
    className="bg-main text-white py-3 px-6 mt-5 rounded-lg w-full text-lg font-semibold hover:bg-green-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
  >
    {loading ? "جارٍ التحميل..." : "نشر"}
  </button>
</form>


      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={uploadRef}
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default ShareCategory;
