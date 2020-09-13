const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  storeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  initialQuantity: {
    type: Number,
    required: true,
  },
  currentQuantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Item", ItemsSchema);
