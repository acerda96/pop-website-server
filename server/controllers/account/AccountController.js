const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const Item = require("../../models/ItemModel");
const Store = require("../../models/StoreModel");
const {
  validateRegister,
  validateLogin,
  validatePassword,
} = require("./validation");
const verifyToken = require("../../utils/verifyToken");

//@routes POST api/account/register
//@desc Register user
router.post("/register", validateRegister, async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  const newUser = new User({ ...body, password: hashPassword });

  newUser
    .save()
    .then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      res.status(200).json({ token, userId: user._id });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

//@routes POST api/account/login
//@desc Login user
router.post("/login", validateLogin, (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.TOKEN_SECRET);
  res.status(200).json({ token, userId: req.user.id });
});

//@routes DELETE api/account/
//@desc Delete a user and all stores/items
router.delete("/", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);

  const validPassword = await validatePassword(
    req.body.password,
    user.password
  );

  if (!validPassword) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }

  User.findByIdAndDelete(req.user.id).catch(() => {
    res.status(404).json({ error: "User could not be found" });
  });

  Store.deleteMany({ userId: req.user.id }).catch(() =>
    res.status(404).json({ error: "User stores could not be deleted" })
  );

  Item.deleteMany({ userId: req.user.id })
    .then(() => res.status(204).json({}))
    .catch(() =>
      res.status(404).json({ error: "User items could not be deleted" })
    );
});

module.exports = router;
