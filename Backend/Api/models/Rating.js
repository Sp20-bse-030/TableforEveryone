const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    userId: { 
        type: String 
    },
    tableId:{
        type:String
    },
    mID:{
      type:String
    },
  rating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
});

// Create the Restaurant model
const Rating = mongoose.model("rating", ratingSchema);

module.exports = Rating;