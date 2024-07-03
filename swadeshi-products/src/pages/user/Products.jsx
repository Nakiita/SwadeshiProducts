import React, { useState, useEffect } from "react";
import { getAllProductsApi } from "../../apis/Api";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      getAllProductsApi(categoryId).then((res) => {
        console.log(res.data.products[0]);
        setProducts(res.data.products);
      });
    }
  }, [categoryId]);

  return (
    <div className="container mx-auto">
      <div className="flex">
        <Navbar />
        <div className="flex flex-wrap justify-center w-full">
          <h3 className="text-xl font-semibold mx-auto mt-24 w-full">
            PRODUCTS
          </h3>
          {products.map((product, index) => {
            // Log the current product and index to the console
            console.log("Product:", product, "Index:", index);

            return (
              <div className="w-full md:w-1/4 p-2" key={product.id || index}>
                {" "}
                {/* Use product.id if available, otherwise fall back to index */}
                <div className="max-w-sm bg-white border border-gray-200 shadow-md">
                  <div className="h-60 w-full object-cover overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
