import React, { useState } from 'react';
import SearchInput from '../../components/Search';
import Accepted from './paged_user/Accepted';
import Pending from './paged_user/Pending';
import Rejected from './paged_user/Rejected';
import Suspending from './paged_user/Suspending';

const User = () => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState("accepted");
  const [page, setPage] = useState(<Accepted />);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChangePage = (page, item) => {
    setActive(item);
    setPage(page);
  };

  return (
    <div className="p-4 ">
      <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />

      <div className="text-black">
      {/* Tabs for larger screens */}
      <div className="flex items-center justify-between text-xl border-b lg:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-xl cursor-pointer bg-green pb-2 m-4 text-white"
        >
          Open Tabs
        </button>
      </div>

      {/* Dropdown for small screens */}
      {isDropdownOpen && (
  <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black bg-opacity-50" onClick={() => setIsDropdownOpen(false)}>
    <div className="bg-white rounded-lg shadow-lg w-1/3 p-4" onClick={(e) => e.stopPropagation()}>
      <h3
        onClick={() => handleChangePage(<Accepted />, "accepted")}
        className={`cursor-pointer p-3 rounded-lg ${active === "accepted" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
      >
        Accepted
      </h3>
      <h3
        onClick={() => handleChangePage(<Pending />, "pending")}
        className={`cursor-pointer p-3 rounded-lg ${active === "pending" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
      >
        Pending
      </h3>
      <h3
        onClick={() => handleChangePage(<Rejected />, "rejected")}
        className={`cursor-pointer p-3 rounded-lg ${active === "rejected" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
      >
        Rejected
      </h3>
      <h3
        onClick={() => handleChangePage(<Suspending />, "suspending")}
        className={`cursor-pointer p-3 rounded-lg ${active === "suspending" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
      >
        Suspending
      </h3>
    </div>
  </div>
)}


      {/* Tabs for larger screens */}
      <div className="hidden lg:flex items-center gap-10 text-xl border-b">
        <h3
          onClick={() => handleChangePage(<Accepted />, "accepted")}
          className={`cursor-pointer pb-2 ${active === "accepted" ? "border-b-4 border-black" : ""}`}
        >
          Accepted
        </h3>
        <h3
          onClick={() => handleChangePage(<Pending />, "pending")}
          className={`cursor-pointer pb-2 ${active === "pending" ? "border-b-4 border-black" : ""}`}
        >
          Pending
        </h3>
        <h3
          onClick={() => handleChangePage(<Rejected />, "rejected")}
          className={`cursor-pointer pb-2 ${active === "rejected" ? "border-b-4 border-black" : ""}`}
        >
          Rejected
        </h3>
        <h3
          onClick={() => handleChangePage(<Suspending />, "suspending")}
          className={`cursor-pointer pb-2 ${active === "suspending" ? "border-b-4 border-black" : ""}`}
        >
          Suspending
        </h3>
      </div>
    </div>

      {page}
    </div>
  );
};

export default User;