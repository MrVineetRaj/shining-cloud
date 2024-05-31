"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="bg-white flex items-center my-2 py-2 px-2 gap-2 rounded mx-2">
      <IoSearch className="text-xl text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="border-b-2 outline-none bg-white border-b-gray-200 w-[100%] h-[30px] px-2"
        onKeyDown={(e)=>{e.key == "Enter" && console.log(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
