import React, { useState, useRef, useEffect } from "react";
import Navbar_category from "../../components/Category_screen/Navbar_category";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { usePost } from "../../Hooks/usePostJson";

const ShareCategory = () => {
  const [image, setImage] = useState(null); // State to store uploaded image
  const uploadRef = useRef(null); // Reference for file input

  const location = useLocation();
  const { item, type, image_category,category,item_sub } = location.state; // Retrieve the state data
  const [selectedValue, setSelectedValue] = useState(""); // State to store selected value
  const [selectedButton, setSelectedButton] = useState("");
  const [categoryId, setCategoryId] = useState(category?.id);
  const [subCategoryId, setSubCategoryId] = useState(item_sub?.id);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState('');
  const [quantity, setQuantity] = useState(0); // Initial value is set to 0
  const [productPrice, setProductPrice] = useState("");
  const [productLocation, setProductLocation] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]); // Selected sizes
  const [productColor, setProductColor] = useState(""); // Product color
  const [productQuality, setProductQuality] = useState("");  
  const [images, setImages] = useState([]); // Stores base64 images
  // const [successMessage, setSuccessMessage] = useState(""); // State for success message
  
  const [loading, setLoading] = useState(false); 
  
useEffect(() => {
console.log("type",item)
}, [item])

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

  
  // Handle Gender selection
  const handleChange = (e) => setSelectedValue(e.target.value);

  // Handle Condition selection
  const handleClick = (condition)=> {
    setProductQuality(condition);
    setSelectedButton(condition)
  console.log(condition)
  };

  // Handle Input Changes
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Handle Size Selection
  const toggleSize = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size) // Remove if already selected
        : [...prevSizes, size] // Add if not selected
    );
  };

    const { postData, loadingPost, response } = usePost({
      url: `https://marfaa-alex.com/api/admin/add/product`,
    });
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData()

    formData.append('category_id',categoryId)
    formData.append('subCategory_id',subCategoryId)
    formData.append('name',productName)
    formData.append('description',productDescription)
    formData.append('price',productPrice)
    formData.append('location',productLocation)
    formData.append('quantity',quantity)
    formData.append('size',selectedSizes)
    formData.append('color',productColor)
    formData.append('images ',images)
    formData.append('type ',selectedValue)

    postData(formData,"data added successful")

   

    console.log("Product Data:", formData);

    // setTimeout(() => setLoading(false), 2000); // Simulate API call
  };

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



  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]); // Store Base64 images
        };
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Trigger the file input when clicking the "تغير" text
  const triggerFileInput = () => {
    uploadRef.current.click();
  };



  const navigate = useNavigate();

  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   // Validate all inputs
  //   if (!type) {
  //     toastError("يرجى اختيار نوع المنتج");
  //     return;
  //   }
    
  //   if (!item) {
  //     toastError("يرجى اختيار العنصر");
  //     return;
  //   }
    
  //   if (!selectedValue) {
  //     toastError("يرجى اختيار القيمة");
  //     return;
  //   }
    
  //   if (!selectedButton) {
  //     toastError("يرجى اختيار الزر");
  //     return;
  //   }
    
  //   if (!productTitle) {
  //     toastError("يرجى إدخال عنوان المنتج");
  //     return;
  //   }
    
  //   if (!productDescription) {
  //     toastError("يرجى إدخال وصف المنتج");
  //     return;
  //   }
    
  //   if (!productPrice) {
  //     toastError("يرجى إدخال سعر المنتج");
  //     return;
  //   }
    
  //   if (!productAddress) {
  //     toastError("يرجى إدخال عنوان المنتج");
  //     return;
  //   }
    
  //   if (value <= 0) {
  //     toastError("القيمة يجب أن تكون أكبر من صفر");
  //     return;
  //   }
  
  //   // Set loading to true when submitting
  //   setLoading(true);
  
  //   // Simulate a 3-second delay before proceeding
  //   setTimeout(() => {
  //     // Create a new item object
  //     const newItem = {

  //       type,
  //       item,
  //       selectedValue,
  //       selectedButton,
  //       productTitle,
  //       productDescription,
  //       productPrice,
  //       productAddress,
  //       value,
  //       image,
  //       status:"Completed",
  //     };
  
  //     // Optionally save to localStorage
  //     const existingItems = JSON.parse(localStorage.getItem("categoryItems")) || [];
  //     localStorage.setItem("categoryItems", JSON.stringify([...existingItems, newItem]));

  //     toastSuccess("Added successful")
  
  //     // Navigate to the "Category" page with the new data
  //     navigate("/product", { state: { items: [...existingItems, newItem] } });
  
  //     // Reset loading state after 3 seconds
  //     setLoading(false);
  //   }, 3000); // 3 seconds delay
  // };

  // Reset form fields
  // const resetForm = () => {
  //   setImage(null);
  //   setSelectedValue("");
  //   setSelectedButton("");
  //   setProductTitle("");
  //   setProductDescription("");
  //   setProductPrice("");
  //   setProductAddress("");
  //   setValue(0);
  // };
  

  return (
    <div className="flex flex-col bg-white h-fit">
      {/* Navbar */}
      <Navbar_category />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between relative top-[80px] p-4 gap-3 bg-white">
        {/* Left Part: Box 400x450 */}
        <div className="w-full flex flex-col items-center">
      {/* File Input (Hidden) */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        id="fileInput"
        className="hidden"
      />

      {/* Upload Box */}
      <div
        className="w-full md:w-[500px] h-[200px] bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer mb-6"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <span className="text-black cursor-pointer">اضف صور</span>
      </div>

      {/* Image Preview Grid */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Uploaded ${index}`}
              className="w-28 h-28 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>

        {/* Category Information */}

        <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end md:w-[70%] bg-white px-4 rounded-lg space-y-2 gap-2"
    >
        <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:الفئة</h2>
    <div className="flex justify-between items-end bg-gray-100 w-full p-3 rounded-md">
      {/* <p onClick={triggerFileInput} className="text-green ml-4 cursor-pointer">
        تغير
      </p> */}
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

{/* 3rd Step: حالة المنتج */}
<div className="flex flex-col items-end w-full">
  <h2 className="text-2xl text-black font-semibold mb-2">:الحالة</h2>
  <div className="flex space-x-2 justify-end items-end w-full">
    {["مستعمل", "مستعمل كالجديد", "جديد"].map((condition) => (
      <button
        key={condition}
        type="button"
        onClick={() => handleClick(condition)}
        className={`px-4 py-1 rounded-md border-none ${
          selectedButton === condition
            ? "bg-green text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        {condition}
      </button>
    ))}
  </div>
</div>

  


      {/* Subcategory Selection */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:النوع</h2>
        <select
          value={selectedValue}
          onChange={handleChange}
          className="bg-gray-100 text-black outline-none p-2 rounded-md w-full pr-8"
        >
          <option value="" disabled>اختر</option>
          <option value="male">رجالي</option>
          <option value="female">حريمي</option>
          <option value="other">اخر</option>
        </select>
      </div>

      {/* Product Name */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:اسم المنتج</h2>
        <input
          type="text"
          value={productName}
          onChange={handleInputChange(setProductName)}
          placeholder="ادخل اسم المنتج"
          dir="rtl"
          className="bg-gray-100 text-black w-full p-2 rounded-md border outline-none"
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:الوصف</h2>
        <textarea
          value={productDescription}
          onChange={handleInputChange(setProductDescription)}
          placeholder="ادخل وصف المنتج"
          dir="rtl"
          className="bg-gray-100 text-black w-full p-2 rounded-md border outline-none"
        />
      </div>

      {/* Product Color */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:اللون</h2>
        <input
          type="text"
          value={productColor}
          onChange={handleInputChange(setProductColor)}
          placeholder="ادخل اللون"
          dir="rtl"
          className="bg-gray-100 text-black w-full p-2 rounded-md border outline-none"
        />
      </div>

      {/* Size Selection */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:المقاسات</h2>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`p-2 px-4 rounded-md  ${
                selectedSizes.includes(size)
                  ? "bg-green text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Product Price */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:السعر</h2>
        <input
          type="number"
          value={productPrice}
          onChange={handleInputChange(setProductPrice)}
          placeholder="ادخل السعر"
          dir="rtl"
          className="bg-gray-100 text-black w-full p-2 rounded-md border outline-none"
        />
      </div>

       {/* 8th Step */}
  <div className="flex flex-col items-end w-full">
    <h2 className="text-2xl text-black font-semibold mb-2">:عدد القطع</h2>
    <div className="flex items-center w-full ">
      <button
      type="button"
        onClick={()=>setQuantity(pre=>pre-1)}
        className="bg-gray2 text-black px-4 py-2 rounded-l-md  hover:bg-gray2"
      >
        -
      </button>
      <span className="px-6 py-2 text-lg text-black">{quantity}</span>
      <button
      type="button"
        onClick={()=>setQuantity(pre=>pre+1)}
        className="bg-gray2 text-black px-4 py-2 rounded-r-md hover:bg-gray2"
      >
        +
      </button>
    </div>
  </div>

      {/* Product Location */}
      <div className="flex flex-col items-end w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">:الموقع</h2>
        <input
          type="text"
          value={productLocation}
          onChange={handleInputChange(setProductLocation)}
          placeholder="ادخل الموقع"
          dir="rtl"
          className="bg-gray-100 text-black w-full p-2 rounded-md border outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green text-white p-2 rounded-md hover:bg-main transition"
        disabled={loading}
      >
        {loading ? "جاري الإرسال..." : "إرسال المنتج"}
      </button>
    </form>


      </div>

      {/* Hidden file input
      <input
        type="file"
        accept="image/*"
        ref={uploadRef}
        className="hidden"
        onChange={handleImageUpload}
      /> */}
    </div>
  );
}

export default ShareCategory;
