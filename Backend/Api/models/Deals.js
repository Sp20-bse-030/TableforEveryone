const mongoose = require('mongoose');

// Define the Deal schema
const dealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mID: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String], // Assuming an array of image URLs
        default: []
    },
    ratings: {
        type: [Number], // Assuming an array of ratings (numbers)
        default: []
    },
}, { timestamps: true });

// Create the Deal model
const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
