import React, { useState } from "react";

const ProductImages = ({productImages}) => {
  const [currentImage, setCurrentImage] = useState(0);


  return (
    <div className="p-5">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-4">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-10 h-10 rounded-md cursor-pointer object-cover"
              alt={`Product Image ${index + 1}`}
              onMouseOver={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <div>
          <img
            src={productImages[currentImage]}
            className="w-[40rem] h-[20rem] rounded-md cursor-pointer object-cover"
            alt="Displayed Product"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
