import React from "react";

export const Banner = () => {
  return (
    <div className="md:mt-32 flex flex-row gap-4 w-full justify-around">
      <div className="w-[23rem]">
        <h4 className="mb-4 font-bold text-lg">
          Each purchase, a pledge to our homeland.
        </h4>
        <img
          src="../assets/images/made-in-nepal.jpg"
          className=" object-cover rounded-lg"
          alt="Made in Nepal"
        />
      </div>
      <img
        src="../assets/images/ssss.png"
        className="w-[65rem] h-[33rem] object-cover rounded-lg"
        alt="Swadeshi Collection"
      />
    </div>
  );
};
