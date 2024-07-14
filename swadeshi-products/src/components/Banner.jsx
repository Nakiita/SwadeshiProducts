import React from "react";

export const Banner = () => {
  return (
    <div className="md:mt-32 flex flex-row gap-4 w-full justify-around p-6">
      <div className="w-[25rem]">
        <h4 className="mb-4 font-bold text-md">
          Each purchase, a pledge to our homeland.
        </h4>
        <img
          src="../assets/images/made-in-nepal.jpg"
          className=" object-cover rounded-lg"
          alt="Made in Nepal"
        />
      </div>
      <a href="/categories">
        <img
          src="../assets/images/HomePage.png"
          className="w-[65.5rem] object-cover rounded-lg mt-3"
          alt="Swadeshi Collection"
        />
      </a>
    </div>
  );
};
