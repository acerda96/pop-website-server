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
  street: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
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
