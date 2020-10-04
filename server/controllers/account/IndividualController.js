const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");

const verifyToken = require("../../utils/verifyToken");

//@routes POST api/individual
//@desc Register user

router.get("/", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ error: "Could not retrieve user" });
    });
});

module.exports = router;
