const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: [String],
  longitude:{
    type: Number
  },
  latitude:{
    type: Number
  },
  rating:{
    type: Number
  },
});

// Create the Restaurant model
const User = mongoose.model("user", userSchema);

module.exports = User;
