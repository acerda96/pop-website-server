const express = require("express");
const router = express.Router();
const Item = require("../../models/ItemModel");
const Store = require("../../models/StoreModel");
const verifyToken = require("../../utils/verifyToken");

//@routes GET api/stores/:id
//@desc Get store by id
router.get("/:id", (req, res) => {
  Store.findById(req.params.id)
    .then((store) => {
      res.status(200).json(store);
    })
    .catch(() => {
      res.status(404).json({ error: "Store could not be found" });
    });
});

//@routes GET api/stores
//@desc Get stores
router.get("/", (req, res) => {
  if (req.query.userId) {
    Store.find({ userId: req.query.userId })
      .then((stores) => {
        res.status(200).json(stores);
      })
      .catch((err) => {
        res.status(400).json({ error: "Could not retrieve stores" });
      });
  } else {
    Store.find()
      .then((stores) => {
        res.status(200).json(stores);
      })
      .catch((err) => {
        res.status(400).json({ error: "Could not retrieve stores" });
      });
  }
});

//@routes POST api/stores
//@desc Add a store
router.post("/", verifyToken, (req, res) => {
  const newStore = new Store({ ...req.body, userId: req.user.id });
  console.log(newStore);
  newStore
    .save()
    .then((store) => {
      res.status(201).json(store);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ error: "Could not add store" });
    });
});

//@routes DELETE api/stores
//@desc Delete a store
router.delete("/:id", verifyToken, (req, res) => {
  Store.findById(req.params.id)
    .then((store) => {
      if (store.userId === req.user.id) {
        store.delete();
        Item.deleteMany({ storeId: store.id })
          .then(() => res.status(204).json({}))
          .catch(() =>
            res.status(404).json({ error: "Store items could not be deleted" })
          );
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch(() => {
      res.status(404).json({ error: "Store could not be found" });
    });
});

module.exports = router;
