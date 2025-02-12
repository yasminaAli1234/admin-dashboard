import React, { useState } from 'react';
import { useData } from '../../../Context/data';

const Show_info_user = () => {
  const { data } = useData();

  // Dropdown values for gender and cities (you can replace these with actual data)
  const genders = ['Male', 'Female'];
  const cities = ['New York', 'Los Angeles', 'Chicago'];
  const areas = ['Area 1', 'Area 2', 'Area 3'];
  const [click,setClick] = useState(false);

  const handleClick= ()=>{
    setClick(pre=>!pre)
  }
  const [product, setProduct] = useState(data);

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="text-black p-6">
      {/* User Info - Display flex row with image and details */}
   <div className="flex justify-between items-center">
   <div className="flex flex-row  items-center gap-5">
        <img
          src={data.userImage}
          alt={data.userName}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{data.userName}</h2>
          <p className="text-sm">Email: {data.email}</p>
          <p className="text-sm">Phone: {data.phone}</p>
        </div>
      
        
     
      </div>
      <button
          onClick={handleClick}
          className={`bg-gray-200 p-2 rounded-md relative ${click ? "bg-green text-white" : ""} border-none`}
        >

          Action

        </button>
   </div>


      {/* Second Row - Name and Mobile */}
      <div className="flex flex-row justify-between mt-6">
        <div className="w-1/2 pr-4">
          <label className="block text-3sm font-medium">Full Name</label>
          <input
            type="text"
            value={data.userName}
            readOnly
            className="w-full mt-2 p-2 outline-none border border-gray-300 bg-gray2 rounded-md"
          />
        </div>
        <div className="w-1/2 pl-4">
          <label className="block text-3sm font-medium">Mobile Number</label>
          <input
            type="text"
            value={data.phone}
            readOnly
            className="w-full mt-2 p-2 border outline-none border-gray-300 bg-gray2 rounded-md"
          />
        </div>
      </div>

      {/* Third Row - Gender, Age, City, Area, Date of Joining, National ID */}
      <div className="flex flex-wrap gap-6 mt-6">
  {/* Gender */}
  <div className="w-1/5 min-w-[180px]">
    <label className="block text-sm font-medium mb-1">Gender</label>
    <select
      value={product.gender}
      onChange={(e) => setProduct({ ...product, gender: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md  bg-gray2  focus:outline-none"
    >
      {genders.map((gender, index) => (
        <option key={index} value={gender}>
          {gender}
        </option>
      ))}
    </select>
  </div>

  {/* Age */}
  <div className="w-1/5 min-w-[180px]">
    <label className="block text-sm font-medium mb-1">Age</label>
    <input
      type="text"
      value={data.age}
      readOnly
      className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
    />
  </div>

  {/* City */}
  <div className="w-1/5 min-w-[180px]">
    <label className="block text-sm font-medium mb-1">City</label>
    <select
      value={data.location}
      onChange={(e) => setProduct({ ...product, city: e.target.value })}
      className="w-full p-2 border border-gray-300  bg-gray2 rounded-md outline-none"
    >
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

  {/* Area */}
  <div className="w-1/5 min-w-[180px]">
    <label className="block text-sm font-medium mb-1">Area</label>
    <select
      value={product.area}
      onChange={(e) => setProduct({ ...product, area: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md bg-gray2  focus:outline-none"
    >
      {areas.map((area, index) => (
        <option key={index} value={area}>
          {area}
        </option>
      ))}
    </select>
  </div>

  {/* Date of Joining */}
  <div className="w-1/5 min-w-[180px]">
    <label className="block text-sm font-medium mb-1">Date of Joining</label>
    <input
      type="text"
      value={data.registrationDate}
      readOnly
      className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
    />
  </div>

  {/* National ID */}
  <div className="w-1/5 min-w-[180px]">
    <label className="block text-sm font-medium mb-1">National ID</label>
    <input
      type="text"
      value={data.nationalID}
      className="w-full p-2 border bg-gray2 border-gray-300 rounded-md"
    />
  </div>
</div>


      <div className="flex flex-row justify-between mt-6">

      </div>

      <div className="flex flex-row justify-between mt-6">
     
     
      </div>

      {/* Fourth Row - Full Address */}
      <div className="mt-6">
        <label className="block text-3sm font-medium">Full Address</label>
        <input
          type="text"
          value={data.address}
          readOnly
          className="w-full mt-2 p-2 outline-none border border-gray-300 bg-gray2 rounded-md"
        />
      </div>

      {/* Fifth Row - Gallery */}
      <div className="mt-6">
        <label className="block text-3sm font-bold">Products:</label>
        <div className="flex gap-4 mt-2">
          {data.gallery.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.img}
                alt={item.describtion}
                className="w-20 h-20 rounded-md object-cover"
              />
              <span className="text-xs text-gray-500 ">{item.describtion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Show_info_user;
