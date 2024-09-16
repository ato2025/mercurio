import React from "react";

function Skeleton({ count }) {
  const newArray = new Array(count).fill(0);
  return (
    <div className="w-full  py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around  w-full mx-auto ">
        {newArray.map((item, index) => (
          <div
            key={index}
            className="w-[300px] mx-auto animate-pulse bg-gray-300 p-4 rounded-md shadow-md"
          >
            <div className="h-6 bg-gray-400 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-400 mb-2 mx-auto"></div>
            <div className="h-4 bg-gray-400 mx-auto mt-5 lg:mt-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
