import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import OriginalJoi from "@hapi/joi";
import splitCamelCase from "./helpers";
import JoiPhoneNumber from "joi-phone-number";
const Joi = OriginalJoi.extend(JoiPhoneNumber);

const registerSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  name: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  mobileNumber: Joi.string().phoneNumber().required(),
  company: Joi.string().allow("").optional(),
  confirmPassword: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

async function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body);

  if (error && error.details[0].message) {
    const field = error.details[0].path[0];

    let message = error.details[0].message;
    message = message.replace(`${field}`, splitCamelCase(field));

    return res.status(400).json({ error: message });
  }
  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) {
    return res.status(400).json({ error: "Email already taken" });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ error: "Passwords must match" });
  }
  req.body.email = req.body.email.toLowerCase();
  next();
}

async function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error && error.details[0].message) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email.toLowerCase() });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const validPassword = validatePassword(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  req.user = user;
  next();
}

async function validatePassword(storedPassword, inputPassword) {
  return await bcrypt.compare(storedPassword, inputPassword);
}

export default { validateRegister, validateLogin, validatePassword };
