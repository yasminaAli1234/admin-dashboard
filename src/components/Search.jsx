import React from 'react';

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-1 items-center mb-4 bg-gray2 border-none text-black rounded-3xl p-1 shadow-sm">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="w-full p-2  bg-transparent border-none focus:outline-none placeholder:text-black placeholder:font-bold caret-black "
      />
      <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg px-4 "></i>
    </div>
  );
};

export default SearchInput;

