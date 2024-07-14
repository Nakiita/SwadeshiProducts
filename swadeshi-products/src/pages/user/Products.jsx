import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProductsApi, createCartApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCart = (productId, navigateAfter = false) => {
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
          if (navigateAfter) {
            navigate("/cart");
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error("Error adding to cart:", err);
      });
  };

  useEffect(() => {
    if (categoryId) {
      getAllProductsApi(categoryId)
        .then((res) => {
          if (res.data && Array.isArray(res.data.products)) {
            setProducts(res.data.products);
          } else {
            console.error("Unexpected response structure:", res.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [categoryId]);

  const handleProductClick = (id) => {
    navigate(`/product-description/${id}`);
  };

  const shortenProductName = (name) => {
    const maxLength = 25;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  return (
    <div className="container mt-32">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold ">PRODUCTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
                key={product._id || index}
                onClick={() => handleProductClick(product._id)}
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
            <p className="text-center mt-10">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
