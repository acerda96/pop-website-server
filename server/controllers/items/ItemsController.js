const express = require("express");
const router = express.Router();
const Item = require("../../models/ItemModel");
const Store = require("../../models/StoreModel");
const verifyToken = require("../../utils/verifyToken");
const Joi = require("@hapi/joi");
const { upload } = require("./multer-upload");

const searchSchema = Joi.object({
  sortCriterion: Joi.number().required(),
  page: Joi.number().required(),
  size: Joi.number().required(),
  type: Joi.number().required(),
  storeId: Joi.string(),
});

//@routes GET api/item/:id
//@desc Get item by id
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch(() => {
      res.status(404).json({ error: "Item could not be found" });
    });
});

//@routes POST api/item
//@desc Add an item
router.post("/", verifyToken, upload.array("images", 4), (req, res) => {
  Store.findById(req.body.storeId)
    .then((store) => {
      if (store.userId !== req.user.id)
        res.status(401).json({ error: "Unauthorized" });
      else {
        const newItem = new Item({
          ...req.body,
          userId: req.user.id,
          currentQuantity: req.body.initialQuantity,
          images: req.files,
        });
        newItem
          .save()
          .then((item) => {
            res.status(201).json(item);
          })
          .catch((err) => {
            console.log(err.message);
            res.status(400).json({ error: "Item could not be added" });
          });
      }
    })
    .catch(() => res.status(400).json({ error: "Store could not be found" }));
});

//@routes DELETE api/item
//@desc Delete an item
router.delete("/:id", verifyToken, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      if (item.userId === req.user.id) {
        item.delete();
        res.status(204).send();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch(() => {
      res.status(404).json({ error: "Item could not be found" });
    });
});

//@routes POST api/item/search
//@desc Get items
router.post("/search", async (req, res) => {
  const { error } = searchSchema.validate(req.body);
  if (error && error.details[0].message) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    let items;
    // apply sortCriterion
    if (req.body.sortCriterion === 1) {
      items = await Item.find().sort({ unitPrice: 1 });
    } else {
      items = await Item.find().sort({ $natural: -1 });
    }
    if (!items) throw Error;

    // apply type
    if (req.body.type !== 0) {
      items = items.filter((item) => item.type === req.body.type);
    }
    // apply storeId
    if (req.body.storeId) {
      items = items.filter((item) => item.storeId === req.body.storeId);
    }

    res
      .status(200)
      .json(items.slice(req.body.page * req.body.size, req.body.size));
  } catch (err) {
    res.status(404).json({ error: "Items could not be retrieved" });
  }
});

module.exports = router;
