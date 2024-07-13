import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ product,user }) => {
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/product-description/${id}`);
  };

const handleReview = () =>{
  navigate ('/review');
}

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row mb-6">
      {/* Product Image and Details */}
      <div className="flex flex-1">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="w-32 h-32 self-center"
        />
        <div className="mt-4 ml-4 flex-grow">
          <h3 className="text-lg font-semibold">{product.productName}</h3>
          <p className="text-sm text-gray-600">at {user.address}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Total: Rs.{product.productPrice}</p>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex flex-col justify-between flex-1 mb-4">
        <div className="flex justify-end">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.isDelivered ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
              <span className="text-xs ml-1">
                {product.isDelivered ? "Delivered" : "Delivery Pending"}
              </span>
            </div>
            <div className="flex items-center">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.isPaid ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-xs ml-1">
                {product.isPaid ? "Paid" : "Payment Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 md:mt-0">
          <button className="text-black border border-gray-300 hover:bg-gray-100 rounded-sm py-1 px-3 text-xs mx-1">
            Help
          </button>
          <button
            onClick={() => handleProductClick(product.productId)}
            className="text-black border border-gray-300 hover:bg-gray-100 rounded-sm py-1 px-3 text-xs mx-1"
          >
            View Details
          </button>
          <button 
          onClick={handleReview}
          className="bg-black hover:bg-opacity-90 text-white py-1 px-3 rounded text-xs mx-1">
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
