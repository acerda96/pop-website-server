const express = require("express");
const router = express.Router();
const Item = require("../../models/ItemModel");
const Store = require("../../models/StoreModel");
const verifyToken = require("../../utils/verifyToken");
const Joi = require("@hapi/joi");
const { upload } = require("./multer-upload");

const searchSchema = Joi.object({
  sortCriterion: Joi.number(),
  // page: Joi.number().required(),
  // size: Joi.number().required(),
  type: Joi.number(),
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
router.get("/", async (req, res) => {
  const params = req.query;
  const { error } = searchSchema.validate(params);

  if (error && error.details[0].message) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    let items;
    let filterParams = {};
    if (params.storeId) filterParams.storeId = params.storeId;
    if (params.type > 0) filterParams.type = params.type;
    filterParams = Object.keys(filterParams).length === 0 ? null : filterParams;

    if (params.sortCriterion == 1) {
      items = await Item.find(filterParams).sort({ unitPrice: 1 });
    } else {
      items = await Item.find(filterParams).sort({ $natural: -1 });
    }
    if (!items) throw Error;
    res.status(200).json(items);

    // res.status(200).json(items.slice(params.page * params.size, params.size));
  } catch (err) {
    res.status(404).json({ error: "Items could not be retrieved" });
  }
});

module.exports = router;
