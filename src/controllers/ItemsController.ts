import express from "express";
import Item from "../models/ItemModel";
import Store from "../models/StoreModel";
import { verifyToken, verifyOptionalToken } from "../utils/verifyToken";
import upload from "../utils/multerUpload";
import Joi from "@hapi/joi";
import splitCamelCase from "../utils/helpers";

const itemSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  initialQuantity: Joi.number().allow("").optional(),
  price: Joi.number().required(),
  images: Joi.allow(),
  storeId: Joi.required(),
  userId: Joi.allow(),
});

const router = express.Router();

router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      return res.status(200).json(item);
    })
    .catch(() => {
      return res.status(404).json({ error: "Item could not be found" });
    });
});

router.post("/", verifyToken, upload.array("images", 4), (req, res) => {
  Store.findById(req.body.storeId)
    .then((store: any) => {
      if (store.userId !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        const { error } = itemSchema.validate(req.body);

        if (error && error.details[0].message) {
          const field = error.details[0].path[0];

          let message = error.details[0].message;
          message = message.replace(`${field}`, splitCamelCase(field));

          return res.status(400).json({ error: message });
        }
        const newItem = new Item({
          ...req.body,
          userId: req.user.id,
          currentQuantity: req.body.initialQuantity,
          images: req.files,
          status: "pending",
        });
        newItem
          .save()
          .then((item) => {
            return res.status(201).json(item);
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({ error: "Item could not be added" });
          });
      }
    })
    .catch(() => {
      return res.status(400).json({ error: "Store could not be found" });
    });
});

router.delete("/:id", verifyToken, (req, res) => {
  Item.findById(req.params.id)
    .then((item: any) => {
      if (item.userId !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        item.delete();
        return res.status(204).send();
      }
    })
    .catch(() => {
      return res.status(404).json({ error: "Item could not be found" });
    });
});

router.put("/:id", verifyToken, upload.array("images", 4), (req, res) => {
  Item.findById(req.params.id)
    .then((item: any) => {
      if (item.userId !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (req.files) {
        item.images = req.files;
      } else {
        const fields = ["name", "description", "price", "initialQuantity"];

        fields.forEach((field) => {
          if (req.body.hasOwnProperty(field)) {
            item[field] = req.body[field];
          }
        });
      }

      item.status = "pending";

      item
        .save()
        .then((savedItem) => {
          return res.status(201).json(savedItem);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ error: "Item could not saved" });
        });
      return res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ error: "Item could not be found" });
    });
});

router.get("/", verifyOptionalToken, async (req, res) => {
  const storeId = req.query.storeId || null;
  const sortCriterion: number = Number(req.query.sortCriterion);
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size);
  const isAuthenticated = req.user?.id;

  if (storeId) {
    Store.findById(storeId).then((store) => {
      if (
        isAuthenticated &&
        store.userId !== req.user.id &&
        store.status === "pending"
      ) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    });
  }

  const findTerm =
    isAuthenticated && storeId
      ? { storeId }
      : storeId
      ? { storeId, status: "approved" }
      : { status: "approved" };

  const sortTerm: { $natural?: number; price?: number } =
    sortCriterion === 0 ? { $natural: -1 } : { price: 1 };

  try {
    const items = await Item.find(findTerm)
      .sort(sortTerm)
      .skip(size * page)
      .limit(size);

    const totalResults = await Item.find(findTerm).count();

    return res.status(200).json({ items, totalResults });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "Items could not be retrieved" });
  }
});

export default router;
