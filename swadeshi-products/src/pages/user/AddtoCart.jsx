import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { deleteCartApi, getCartApi, orderCategory } from "../../apis/Api";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ setCheckoutSuccess }) => {
  const [carts, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");

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

  const handleDeleteCart = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to remove the item from the cart?"
    );
    if (!confirmDialog) {
      return;
    } else {
      deleteCartApi(id)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            window.location.reload(); 
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error("Error deleting cart item:", error);
          toast.error("Failed to delete cart item");
        });
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === carts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(carts.map((item) => item._id));
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    orderCategory({
      userId: user._id,
      cartItems: carts.map((cartItem) => ({
        productId: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
      total: subtotal,
    })
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setCheckoutSuccess(true);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error("Error creating order:", err);
      });
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCarts = carts.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCart(updatedCarts);
    calculateSubtotal(updatedCarts);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row mt-24 gap-4">
        {/* Cart Items Section */}
        <div className="flex-grow">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h5 className="text-xl font-semibold mb-4">My Cart</h5>
            {carts.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === carts.length}
                      />
                    </th>
                    <th scope="col" className="py-3 px-6">S.N</th>
                    <th scope="col" className="py-3 px-6">Products</th>
                    <th scope="col" className="py-3 px-6">Qty</th>
                    <th scope="col" className="py-3 px-6">Price</th>
                    <th scope="col" className="py-3 px-6">
                      <FontAwesomeIcon icon={faTrash} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b hover:bg-gray-100">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => handleSelectItem(item._id)}
                        />
                      </td>
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6 flex items-center">
                        <img
                          src={item.product?.productImageUrl}
                          alt={item.product?.productName}
                          className="w-10 h-10 rounded-full object-cover mr-4"
                        />
                        {item.product?.productName || "N/A"}
                      </td>
                      <td className="py-4 px-6 ">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleQuantityChange(item._id, -1)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleQuantityChange(item._id, 1)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </td>
                      <td className="py-4 px-6">Rs {item.product?.productPrice}</td>
                      <td className="py-4 px-6">
                        <button
                          className="text-black hover:text-black-700"
                          onClick={() => handleDeleteCart(item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500">No items in the cart.</div>
            )}
          </div>
        </div>

        {/* Checkout Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Cart Total</h2>
            <table className="w-full text-sm text-left text-gray-500 mb-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">Product Name</th>
                  <th className="py-3 px-6">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white border-b hover:bg-gray-100">
                {carts.map((item) => (
                  <tr key={item._id} >
                    <td className="py-4 px-6">{item.product?.productName || "N/A"}</td>
                    <td className="py-4 px-6">Rs {item.product?.productPrice || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mb-3">
              <span>Subtotal:</span>
              <span>Rs {subtotal}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <p>Apply Coupon code</p>
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="COUPON CODE"
              className="mt-4 sm:mt-0 bg-white border border-black font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 w-full"
            />

                <a
                  href="#"
                  title=""dark
                  className="text-white mt-4 sm:mt-0 bg-black hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 :bg-primary-600 focus:outline-none flex items-center justify-center"
                  role="button"
                >
                  APPLY
                </a>


              </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>Rs {subtotal}</span>
            </div>
            <div className="text-center mt-4">
              {carts.length > 0 && (
                <a
                className="w-full mx-auto text-white mt-4 sm:mt-0 bg-black hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 :bg-primary-600 focus:outline-none flex items-center justify-center"
                href={`/billing-page/${subtotal}`}
                >
                  Checkout
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
