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
      <div className="flex justify-between">
          <div className="lg:hidden mt-2 space-y-2 absolute bg-white  w-[35%] ">
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
          <div className="lg:hidden mt-2 space-y-2 absolute bg-white  w-[35%] ">
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
        <i className="fa fa-filter text-black "></i>
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