const mongoose = require("mongoose");
const BookTableSchema = new mongoose.Schema({
  tableId: {
    type: String,
    
  },
  customerName: {
    type: String,
    
  },
  phoneNumber: {
    type: Number,
    
  },
  date: {
    type: String,
    
  },
  duration: {
    type: Number,
    
  },
  startTime: {
    type: Number,
    
  },
  endTime: {
    type: Number,
    
  },
  
});

// Create the Restaurant model
const Table = mongoose.model("table", BookTableSchema);

module.exports = Table;