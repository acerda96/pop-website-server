import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmailSignUpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("EmailSignUp", EmailSignUpSchema);
