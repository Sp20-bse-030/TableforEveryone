const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
 
});

// Create the Restaurant model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
