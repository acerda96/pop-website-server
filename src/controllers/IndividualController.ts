import express from "express";
import User from "../models/UserModel";
import Item from "../models/ItemModel";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).json({ error: "Could not retrieve user" });
    });
});
router.put("/", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user: any) => {
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
    .catch(() => {
      res.status(400).json({ error: "Could not retrieve user" });
    });
});

router.get("/saved-items", verifyToken, (req, res) => {
  User.findById(req.user.id)
    .then((user: any) => {
      const savedItemIds = user.savedItems;

      Item.find({ _id: { $in: savedItemIds } }).then((savedItems) => {
        res.status(200).json(savedItems);
      });
    })
    .catch(() => {
      res.status(400).json({ error: "Could not retrieve saved items" });
    });
});

export default router;
