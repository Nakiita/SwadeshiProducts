import React, { useState, useEffect } from "react";
import { getAllCategoriesApi } from "../../apis/Api";
import Navbar from "../../components/Navbar";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex">
        {/* Navbar placeholder */}
        <Navbar />

        <div className="flex flex-wrap justify-center w-full">
          <h3 className=" text-xl font-semibold mx-auto mt-24 w-full">
            CATEGORIES
          </h3>
          {categories.map((category, index) => (
            <div className="w-full md:w-1/4 p-2" key={index}>
              <div className="max-w-sm bg-white border border-gray-200 shadow-md">
                <div className="h-60 w-full object-cover overflow-hidden">
                  <img
                    src={category.categoryImageUrl}
                    alt={category.categoryName}
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-lg font-medium">
                    {category.categoryName}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
