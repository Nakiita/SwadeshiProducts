import React from "react";

const Search = () => {
  return (
    <div className="flex items-center w-[65%]">
      <div className="relative w-full">
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search your favorite product..."
        />
      </div>
    </div>
  );
};

export default Search;
