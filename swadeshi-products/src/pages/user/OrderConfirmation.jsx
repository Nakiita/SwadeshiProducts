import React from 'react';

const OrderConfirmation = () => {
  // Sample data for demonstration
  const orderDetails = {
    transactionDate: 'Monday, 27th May, 2024',
    email: 'ram@sp.test',
    paymentMethod: 'Khalti',
    items: [
      { name: 'Craft Tea Tray Vintage Bamboo Storage Basket - Bamboo Yellow', price: 'Rs. 2500', quantity: 1 },
      { name: '3 Tier Salt Box by Totally Bamboo', price: 'Rs. 3000', quantity: 1 },
      { name: 'Stoneware Ceramic products', price: 'Rs. 500', quantity: 1 },
    ],
    subtotal: 'Rs. 6000.00',
    shippingCharge: 'Rs. 100',
    discount: 'Rs. 0',
    grandTotal: 'Rs. 6100'
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-xl font-bold mb-8">Thanks for your order!</h1>
        <p>The order confirmation has been sent to <span className="font-semibold">{orderDetails.email}</span></p>
        <div className="mt-4">
          <h2 className="font-semibold text-lg">Transaction Date</h2>
          <p>{orderDetails.transactionDate}</p>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-lg">Payment Method</h2>
          <p>{orderDetails.paymentMethod}</p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Your Order</h2>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="mt-2">
              <p>{item.name}</p>
              <p>{item.price} x {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="font-semibold">Subtotal: {orderDetails.subtotal}</p>
          <p className="font-semibold">Shipping Charge: {orderDetails.shippingCharge}</p>
          <p className="font-semibold">Discount: {orderDetails.discount}</p>
          <p className="font-semibold text-lg">Grand Total: {orderDetails.grandTotal}</p>
        </div>
        <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
