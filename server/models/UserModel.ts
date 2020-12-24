import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  savedItems: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
