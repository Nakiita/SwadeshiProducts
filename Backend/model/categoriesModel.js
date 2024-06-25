const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  categoryImageUrl: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: true,
  },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
});

const Categories = mongoose.model("categories", categoriesSchema);
module.exports = Categories;
