import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1); // Initialize quantity state with a default value of 1

  // Function to increment quantity
  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrement quantity but not below 1
  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setProductCategory(res.data.product.productCategory);
      setProductQuantity(res.data.product.productQuantity);
      setOldImage(res.data.product.productImageUrl);
    });
  }, [id]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [oldImage, setOldImage] = useState("");

  return (
    <div className="bg-white p-8 mt-80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main image and gallery */}
        <div className="md:col-span-1">
          <img
            src={oldImage}
            alt="Main product"
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{productName}</h1>
          <p className="mb-4">{productDescription}</p>
          <p className="font-semibold">Product specifications</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Origin: Nepal.</li>
          </ul>
          <div className="flex items-center mb-4">
            <button
              onClick={decrement}
              className="text-lg font-bold text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 mr-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:bg-gray-200 transition duration-150 ease-in-out"
            >
              -
            </button>
            <span className="text-lg mx-4">{quantity}</span>
            <button
              onClick={increment}
              className="text-lg font-bold text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 ml-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:bg-gray-200 transition duration-150 ease-in-out"
            >
              +
            </button>
          </div>
          <p className="text-xl font-bold">Rs. {productPrice}</p>
          <div className="flex space-x-4 my-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to cart
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* More Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">More Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p className="mt-2 font-semibold">{productName}</p>
          <p>{productPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
