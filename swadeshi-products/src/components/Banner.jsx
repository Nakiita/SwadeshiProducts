import React from "react";

export const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-around p-6 md:mt-32">
      <div className="w-full md:w-[25rem]">
        <h4 className="mb-4 font-bold text-md">
          Each purchase, a pledge to our homeland.
        </h4>
        <img
          src="../assets/images/made-in-nepal.jpg"
          className="w-full object-cover rounded-lg"
          alt="Made in Nepal"
        />
      </div>
      <a href="/categories" className="w-full md:w-auto">
        <img
          src="../assets/images/HomePage.png"
          className="w-full md:w-[72rem] object-cover rounded-lg"
          alt="Swadeshi Collection"
        />
      </a>
    </div>
  );
};
