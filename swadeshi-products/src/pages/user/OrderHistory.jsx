import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartApi } from "../../apis/Api";
import getUser from "../../utils/getUser";
import { toast } from "react-toastify";
import OrderCard from "../../components/OrderCard";

const OrderHistory = () => {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const user = getUser();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    const parsedUserData = JSON.parse(storedUserData);
    const userId = parsedUserData._id;

    getCartApi(userId)
      .then((res) => {
        setOrders(res.data.cart); // Assuming response contains an array of orders
        calculateSubtotal(res.data.cart);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      });
  }, []);

  const calculateSubtotal = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += (order.product?.productPrice || 0) * (order.quantity || 0);
    });
    setSubtotal(total);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mt-24">
      <div className="bg-white p-7 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold">My Order</h1>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            product={order.product}
            user = {user}
            subtotal={subtotal}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
