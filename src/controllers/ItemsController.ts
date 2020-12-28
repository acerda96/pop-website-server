import express from "express";
import Item from "../models/ItemModel";
import Store from "../models/StoreModel";
import verifyToken from "../utils/verifyToken";
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
      if (store.userId !== req.user.id)
        return res.status(401).json({ error: "Unauthorized" });
      else {
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
      if (item.userId === req.user.id) {
        item.delete();
        return res.status(204).send();
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch(() => {
      return res.status(404).json({ error: "Item could not be found" });
    });
});

router.put("/:id", verifyToken, upload.array("images", 4), (req, res) => {
  Item.findById(req.params.id)
    .then((item: any) => {
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

router.get("/", async (req, res) => {
  const RESULTS_PER_PAGE = 20;
  const storeId = req.query.storeId;
  const sortCriterion: number = Number(req.query.sortCriterion);
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || RESULTS_PER_PAGE;

  const findTerm = storeId ? { storeId } : { status: "approved" };
  const sortTerm: { $natural?: number; price?: number } =
    sortCriterion === 0 ? { $natural: -1 } : { price: 1 };

  try {
    const items = await Item.find(findTerm)
      .sort(sortTerm)
      .skip(RESULTS_PER_PAGE * page)
      .limit(size);

    return res.status(200).json(items);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "Items could not be retrieved" });
  }
});

export default router;
