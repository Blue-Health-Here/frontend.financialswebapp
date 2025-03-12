"use client";

import React, { useState } from "react";

const MarketingInfo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className="bg-white shadow-lg rounded-sm p-6 block cursor-pointer"
      onClick={() => setChecked(!checked)}
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-800 font-semibold">Marketing Material Title</span>
        <div
          className={`w-[17px] h-[17px] flex items-center justify-center border-2 rounded-full transition-all 
          ${checked ? "bg-[#0BD700] border-[#0BD700]" : "bg-white border-gray-500"}`}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-[14px] h-[14px]"
            >
              <path
                fillRule="evenodd"
                d="M20.707 5.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l9.293-9.293a1 1 0 0 1 1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti
        tempore adipisci pariatuur...
      </p>
      <button
        className="mt-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-md transition w-full flex items-center justify-center gap-2"
        onClick={(e) => e.stopPropagation()} // Prevents toggling when clicking the button
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.16602 12.7334L3.16602 7.7334L4.56602 6.2834L7.16602 8.8834V0.733398H9.16602V8.8834L11.766 6.2834L13.166 7.7334L8.16602 12.7334ZM2.16602 16.7334C1.61602 16.7334 1.14535 16.5377 0.754015 16.1464C0.362682 15.7551 0.166682 15.2841 0.166016 14.7334V11.7334H2.16602V14.7334H14.166V11.7334H16.166V14.7334C16.166 15.2834 15.9703 15.7544 15.579 16.1464C15.1877 16.5384 14.7167 16.7341 14.166 16.7334H2.16602Z"
            fill="white"
          />
        </svg>
        Download File
      </button>
    </label>
  );
};

export default MarketingInfo;
