import React, { useState } from "react";

const ProductImages = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const productImages = [
    "https://plus.unsplash.com/premium_photo-1718119453300-73be4e1b6212?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
    "https://plus.unsplash.com/premium_photo-1714226830474-e0b8b733340b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
  ];

  return (
    <div className="p-5">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-4">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-10 h-10 rounded-md cursor-pointer"
              alt={`Product Image ${index + 1}`}
              onMouseOver={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <div>
          <img
            src={productImages[currentImage]}
            className="w-[40rem] h-[40rem] rounded-md cursor-pointer"
            alt="Displayed Product"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
