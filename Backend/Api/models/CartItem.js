const mongoose = require('mongoose');

// Create a Mongoose schema for cart items
const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String, // Reference to the user who added the item to the cart
    //required: true,
  },
  mId: {
    type: String, // Reference to the restaurant manager
    //required: true,
  },
  items: [
    {
      name: {
        type: String,
        //required: true,
      },
      price: {
        type: Number,
        //required: true,
      },
      quantity: {
        type: Number,
        //required: true,
        default: 1, // Default quantity is 1
      },
      image: {
        type: String, // You can store image URLs
      },
      createdTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create a model based on the schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
