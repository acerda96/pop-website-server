import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";

const registerSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  name: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  mobileNumber: Joi.string().min(1).required(),
  confirmPassword: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

async function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error && error.details[0].message) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) {
    res.status(400).json({ error: "Email already taken" });
    return;
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).json({ error: "Passwords must match" });
    return;
  }
  req.body.email = req.body.email.toLowerCase();
  next();
}

async function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error && error.details[0].message) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const user = await User.findOne({ email: req.body.email.toLowerCase() });

  if (!user) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }

  const validPassword = validatePassword(req.body.password, user.password);

  if (!validPassword) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }
  req.user = user;
  next();
}

async function validatePassword(storedPassword, inputPassword) {
  console.log("???", storedPassword, inputPassword);
  return await bcrypt.compare(storedPassword, inputPassword);
}

export default { validateRegister, validateLogin, validatePassword };
