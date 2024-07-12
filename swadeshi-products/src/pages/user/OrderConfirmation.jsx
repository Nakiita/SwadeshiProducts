import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartApi, getOrders } from "../../apis/Api";
import getUser from "../../utils/getUser";
import { toast } from "react-toastify";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [carts, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const user = getUser();
  const currentDate = new Date().toLocaleString();
  const [order, setOrders] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    const parsedUserData = JSON.parse(storedUserData);
    const userId = parsedUserData._id;

    getCartApi(userId)
      .then((res) => {
        setCart(res.data.cart);
        calculateSubtotal(res.data.cart);
      })
      .catch((error) => {
        console.error("Error fetching user cart:", error);
        toast.error("Failed to fetch user cart");
      });
  }, []);

  const calculateSubtotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += (item.product?.productPrice || 0) * (item.quantity || 0);
    });
    setSubtotal(total);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Thanks for your order!</h1>
          <p className="mb-6 text-gray-400 text-xs">
            The order confirmation has been sent to {user.email}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-bold">Transaction Date</p>
          <p className="text-gray-400">{currentDate}</p>
          <hr className="my-3" />
        </div>
        {/* Display order items as a list */}
        <div className="mb-4">
          <h2 className=" font-semibold mb-2 ">TRACK ORDER</h2>
          <p>Your Order</p>
          <hr className="my-3" />
          {carts.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center">
                <img
                  src={item.product?.productImageUrl}
                  alt={item.product?.productName}
                  className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <div className="w-64 text-xs">
                  {item.product?.productName || "N/A"}
                  <div>x{item.quantity}</div>
                </div>
              </div>

              <div>Rs {item.product?.productPrice}</div>
            </div>
          ))}
        </div>
        <hr className="my-3" />

        <div className="mb-6">
          <div className="flex justify-between">
            <p className="">Subtotal </p>
            <p> Rs. {subtotal}</p>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between">
            <p className="text-gray-400">Shipping Charge </p>
            <p className="text-gray-400">Rs.100</p>
          </div>
          <div className="flex justify-between text-gray-400">
            <p className="mb-1 ">Discount </p>
            <p>Rs. 0 </p>
          </div>
          <div className="flex justify-between text-gray-400">
            <p className="mb-1 ">Extra Charge </p>
            <p>Rs. 100 </p>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between">
            <p>Grand Total </p>
            <p className="font-bold"> Rs. {subtotal + 200}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Order History
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
