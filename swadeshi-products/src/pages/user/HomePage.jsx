import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Banner } from "../../components/Banner";
import ProductImages from "../../components/ProductImages";

const HomePage = () => {
  return (
    <>
      <div className="mt-5">
        {/* Top Section */}

        <Banner />
        <ProductImages/>

        {/* Discover Authenticity Section */}
        <h3 className="mt-8 mb-4 text-3xl font-semibold">
          Discover Authenticity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="../assets/images/dhaka.jpg"
                className="w-full h-80 object-cover"
                alt="Dhaka"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">Dhaka</h5>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Rs. 1300</p>
                  <div className="flex space-x-4">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-gray-600"
                    />
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="../assets/images/singing-bowl.jpg"
                className="w-full h-80 object-cover"
                alt="Singing Bowl"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">Singing Bowl</h5>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Rs. 3000</p>
                  <div className="flex space-x-4">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-gray-600"
                    />
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="../assets/images/pottery-set.jpg"
                className="w-full h-80 object-cover"
                alt="Pottery Set"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">Pottery Set</h5>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Rs. 1500</p>
                  <div className="flex space-x-4">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-gray-600"
                    />
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
