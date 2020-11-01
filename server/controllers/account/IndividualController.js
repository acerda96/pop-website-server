const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");
const Item = require("../../models/ItemModel");

const verifyToken = require("../../utils/verifyToken");

//@routes GET api/individual
//@desc Get individual from token

router.get("/", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ error: "Could not retrieve user" });
    });
});

//@routes PUT api/individual
//@desc Update individual
router.put("/", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (req.body.itemId) {
        if (!user.savedItems.some((item) => item === req.body.itemId)) {
          user.savedItems.push(req.body.itemId);
        } else {
          user.savedItems = user.savedItems.filter(
            (id) => id !== req.body.itemId
          );
        }
        user.save();
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ error: "Could not retrieve user" });
    });
});

router.get("/saved-items", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      const savedItemIds = user.savedItems;
      console.log(savedItemIds);
      Item.find({ _id: { $in: savedItemIds } }).then((savedItems) => {
        console.log("SAVED", savedItems);
        res.status(200).json(savedItems);
      });
    })
    .catch((err) => {
      res.status(400).json({ error: "Could not retrieve saved items" });
    });
});

module.exports = router;
