import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi, createCartApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import ProductImages from "../../components/ProductImages";
import { toast } from "react-toastify";
import Chat from "./Chat";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    availableQuantity: 0,
    images: [],
  });

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      if (res.data.product) {
        setProductDetails({
          name: res.data.product.productName,
          price: res.data.product.productPrice,
          description: res.data.product.productDescription,
          category: res.data.product.categoryName,
          availableQuantity: res.data.product.productQuantity,
          images: res.data.product.productImageUrls,
        });
      }
    });
  }, [id]);

  const handleCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
    const data = {
      userId: user._id,
      productId: id,
      quantity: quantity,
      status: "pending",
    };
    createCartApi(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success("Product added to cart");
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error("Error adding to cart:", err);
      });
  };

  // Function to increment quantity
  const increment = () => {
    if (quantity < productDetails.availableQuantity) {
      setQuantity(quantity + 1);
    } else {
      toast.info("Cannot add more items than available in stock.");
    }
  };

  // Function to decrement quantity but not below 1
  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>

    <Chat/>
      <section className="py-8 bg-white md:py-16 antialiased mt-14">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <ProductImages productImages={productDetails.images} />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {productDetails.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-3">
                {productDetails.description}
              </p>

              <div className="flex items-center mb-4 mt-5">
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
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="font-bold">Rs {productDetails.price}</p>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-3">
                <a
                  onClick={handleCart}
                  className="text-gray-900 mt-4 sm:mt-0 bg-white border border-black font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
                  role="button"
                >
                  Add to cart
                </a>
                <a
                  href="/cart"
                  className="text-white mt-4 sm:mt-0 bg-black hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 :bg-primary-600 focus:outline-none flex items-center justify-center"
                  role="button"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDescription;
