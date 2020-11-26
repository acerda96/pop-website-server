const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: false,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  postcode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
    required: false,
  },
  dates: {
    type: Array,
    required: false,
    default: [],
  },
  website: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Stores", StoreSchema);
