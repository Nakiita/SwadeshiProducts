import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsApi, createCartApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Banner } from "../../components/Banner";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsApi();
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          toast.error("Failed to load products");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        toast.error("Error fetching products");
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCart = async (productId, navigateAfter = false) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const data = {
      userId: user._id,
      productId,
      quantity: 1,
      status: "pending",
    };

    try {
      const res = await createCartApi(data);
      if (res.data.success) {
        toast.success("Product added to cart");
        if (navigateAfter) {
          navigate("/cart");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Server Error");
      console.error("Error adding to cart:", err);
    }
  };

  const shortenProductName = (name) => {
    const maxLength = 25;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  const handleProductClick = (id) => {
    navigate(`/product-description/${id}`)
  }
  return (
    <>
      <Banner />
      <h3 className="mt-8 mb-4 text-3xl font-semibold">
        Discover Authenticity
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {products.length > 0 ? (
          products.slice(0, 3).map((product, index) => (
            <div
              key={product._id || index}
              onClick={() => handleProductClick(product._id)}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <img
                src={product.productImageUrls[0] || product.productImageUrls}
                alt={product.productName}
                className="h-72 w-full object-cover"
              />
              <div className="p-2">
                <h5 className="text-xl font-semibold mb-2 truncate">
                  {shortenProductName(product.productName)}
                </h5>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">
                    Rs. {product.productPrice}
                  </p>
                  <div className="flex space-x-4">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-gray-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCart(product._id);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-gray-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCart(product._id, true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
