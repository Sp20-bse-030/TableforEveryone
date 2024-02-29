const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String },
  username: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  location: { type: String },
  paymentMethod: { type: String },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
      totalprice: Number,
      
      // Add other fields as needed
    },
  ],
  
  orderStatus: {
    type: [String],
    default: ["pending"],
    enum: ["pending", "approved", "declined"],
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
