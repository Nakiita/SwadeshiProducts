const Cart = require("../model/cartModel");
const User = require("../model/userModel");
const Category = require("../model/categoriesModel");
 
const createCart = async (req, res) => {
  try {
    const { userId, quantity, productId } = req.body;
 
    // Validation
    if (!userId || !quantity || !productId) {
      return res.json({
        success: false,
        message: "User ID, quantity and quantity are required fields",
      });
    }
 
    let cart = await Cart.findOne({ user: userId });
 
    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }
 
    // Check if the product is already in the cart
    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
 
    if (existingItemIndex !== -1) {
      // If the product is in the cart, inform the user
      return res.json({
        success: false,
        message: "Product is already added to the cart",
      });
    }
 
    // If the product is not in the cart, add a new item
    cart.cartItems.push({ product: productId, quantity });
 
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};
 
const getUserCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "cartItems.product",
      select: "productId productName productCategory productPrice productImageUrls",
    });

    if (!cart) {
      return res.json({
        success: true,
        message: "User cart is empty",
        cart: []
      });
    }

    const categoryIds = [...new Set(cart.cartItems.map(item => item.product.productCategory))];

    const categories = await Category.find({ _id: { $in: categoryIds } }).select("categoryName");

    const categoryMap = categories.reduce((map, category) => {
      map[category._id] = category.categoryName;
      return map;
    }, {});

    const formattedCartItems = cart.cartItems.map(item => ({
      product: {
        productId: item.product._id,
        productName: item.product.productName,
        productPrice: item.product.productPrice,
        productImageUrl: item.product.productImageUrls[0],
        categoryName: categoryMap[item.product.productCategory] || "Unknown Category",
      },
      quantity: item.quantity
    }));

    res.json({
      success: true,
      message: "User cart fetched successfully",
      cart: formattedCartItems
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json("Server error");
  }
};
 
const removeFromCart = async (req, res) => {
  const { userid, productid } = req.params;
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userid },
      { $pull: { cartItems: { product: productid } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      cart: cart.cartItems,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



 
const updateCartItemQuantity = async (req, res) => {
  const { itemId, newQuantity } = req.body;
 
  try {
    const cartItem = await CartItem.findById(itemId);
 
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }
 
    cartItem.quantity = newQuantity;
    await cartItem.save();
 
    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update quantity",
    });
  }
};
 
module.exports = {
  createCart,
  getUserCart,
  removeFromCart,
  updateCartItemQuantity,
}; 

const mongoose = require("mongoose");
 