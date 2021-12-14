const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  marketId: {
    type: String,
    required: true,
  },
  marketName: {
    type: String,
    required: true,
  },
  cmdtyId: {
    type: String,
    required: true,
  },
  marketType: {
    type: String,
    required: true,
  },
  cmdtyName: {
    type: String,
    required: true,
  },
  priceUnit: {
    type: String,
    required: true,
  },
  convFctr: {
    type: Number,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  users: {
    type: Array,
    default: [],
    required: true,
  },
});

module.exports = mongoose.model("Report", marketSchema);
