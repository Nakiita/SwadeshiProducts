import React, { useState, useEffect } from "react";
import { getAllProductsApi } from "../../apis/Api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductDescription from "./ProductDescription";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      getAllProductsApi(categoryId)
        .then((res) => {
          console.log("API Response:", res);
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
    navigate(`/product-description/${id}`); // Navigate to product description page
  };

  return (
    <div className="container mx-auto">
      <div className="flex">
        <Navbar />
        <div className="flex flex-wrap justify-center w-full">
          <h3 className="text-xl font-semibold mx-auto mt-24 w-full">
            PRODUCTS
          </h3>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                className="w-full md:w-1/4 p-2 cursor-pointer"
                key={product._id || index}
                onClick={() => handleProductClick(product._id)}
              >
                <div className="max-w-sm bg-white border border-gray-200 shadow-md">
                  <div className="h-60 w-full object-cover overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      onError={(e) =>
                        (e.target.src = "path_to_default_image.jpg")
                      }
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-medium">
                      {product.productName}
                    </h5>
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
