const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    customername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String, // Assuming you'll store the image URL
    },
    userHistory: {
        type: String, // Example field for user history
    },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
