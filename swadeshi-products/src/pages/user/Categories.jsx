import React, { useState, useEffect } from "react";
import { getAllCategoriesApi } from "../../apis/Api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`, { replace: true });
  };

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
            <div
              className="w-full md:w-1/3 p-7"
              key={index}
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="h-30 w-full object-cover overflow-hidden">
                <img
                  src={category.categoryImageUrl}
                  alt={category.categoryName}
                />
              </div>
              <div className="p-1">
                <h5 className="text-lg font-medium">{category.categoryName}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
