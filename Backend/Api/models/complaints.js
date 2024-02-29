const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
    type: String, // Change the type according to your user ID
    //required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  chatDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);