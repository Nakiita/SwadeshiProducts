import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import ProductImages from "../../components/ProductImages";
import { toast } from "react-toastify";
import { createCartApi } from "../../apis/Api";
const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCart = (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
    const data = {
      userId: user._id,
      productId: productId,
      quantity: 1,
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
      setProductCategory(res.data.product.categoryName);
      setProductQuantity(res.data.product.productQuantity);
      setOldImage(res.data.product.productImageUrls);
    });
  }, [id]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [oldImage, setOldImage] = useState([]);

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased mt-14">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <ProductImages productImages={oldImage} />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1
                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
              >
                {productName}
              </h1>
              <div className="flex items-center gap-1 mt-3 ">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    />
                  </svg>
                ))}
              </div>

              <p className="text-gray-500 dark:text-gray-400 mt-3">
                {productDescription}
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
                <p
                  className="font-bold"
                >
                  Rs {productPrice}
                </p>

              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-3">
                <a
                  onClick={() => handleCart(id)}
                  title=""
                  className="text-gray-900 mt-4 sm:mt-0 bg-white border border-black font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
                  role="button"
                >
                  Add to cart
                </a>

                <a
                  href="#"
                  title=""
                  className="text-white mt-4 sm:mt-0 bg-black hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                >
                  Buy Now
                </a>


              </div>
              <div className="flex items-center gap-1 mt-5 ">
                <FontAwesomeIcon icon={faCommentDots} className="text-blue-700 text-2xl" />
                <p>Any Queries?Chat with Seller</p>
              </div>




            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDescription;
