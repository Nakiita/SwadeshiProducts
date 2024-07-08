const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true }
    },
    quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    cart: [cartItemSchema],
    subtotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;
