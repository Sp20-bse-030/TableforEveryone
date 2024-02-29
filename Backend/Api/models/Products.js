const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  mId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the restaurant manager
    //required: true,
  },
  category: String,
  image: [String], // Assuming multiple image URLs, change to String if you only need one
  capacity: Number,
  location: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
