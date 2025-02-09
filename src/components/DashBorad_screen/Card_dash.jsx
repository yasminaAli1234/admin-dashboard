import React from 'react';

const Card_dash = () => {
  return (
    <div className="w-full flex flex-wrap gap-4 p-4 justify-between">
  {/* Card 1 */}
  <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 hover:shadow-xl transition-all duration-200 ease-in-out flex f items-center gap-6">
  {/* Gray square div */}
  <div className="w-12 h-12 bg-gray-300"></div>

  {/* Title with number */}
  <div className="flex flex-col items-center">
    <span className="text-xl  text-black">Title</span>
    <span className="ml-2 text-3xl  text-black font-bold">42</span>
  </div>
</div>

  {/* Card 2 */}
  <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 hover:shadow-xl transition-all duration-200 ease-in-out flex f items-center gap-6">
  {/* Gray square div */}
  <div className="w-12 h-12 bg-gray-300"></div>

  {/* Title with number */}
  <div className="flex flex-col items-center">
    <span className="text-xl  text-black">Title</span>
    <span className="ml-2 text-3xl text-black font-bold">42</span>
  </div>
</div>

  {/* Card 3 */}
  <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 hover:shadow-xl transition-all duration-200 ease-in-out flex f items-center gap-6">
  {/* Gray square div */}
  <div className="w-12 h-12 bg-gray-300"></div>

  {/* Title with number */}
  <div className="flex flex-col items-center">
    <span className="text-xl text-black">Title</span>
    <span className="ml-2 text-3xl text-black font-bold">42</span>
  </div>
</div>
</div>

  );
};

export default Card_dash;
