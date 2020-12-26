import express from "express";
import Item from "../models/ItemModel";
import Store from "../models/StoreModel";
import verifyToken from "../utils/verifyToken";
import Joi from "@hapi/joi";
import upload from "../utils/multer-upload";

const RESULTS_PER_PAGE = 20;

const router = express.Router();

//@routes GET api/items/:id
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

//@routes POST api/items
//@desc Add an item
router.post("/", verifyToken, upload.array("images", 4), (req, res) => {
  console.log(req.body.storeId);
  Store.findById(req.body.storeId)
    .then((store: any) => {
      if (store.userId !== req.user.id)
        res.status(401).json({ error: "Unauthorized" });
      else {
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
            res.status(201).json(item);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Item could not be added" });
          });
      }
    })
    .catch(() => res.status(400).json({ error: "Store could not be found" }));
});

//@routes DELETE api/items
//@desc Delete an item
router.delete("/:id", verifyToken, (req, res) => {
  Item.findById(req.params.id)
    .then((item: any) => {
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

router.put("/:id", verifyToken, (req, res) => {
  Item.findById(req.params.id)
    .then((item: any) => {
      console.log(req.body);

      const fields = ["name", "description", "unitPrice", "initialQuantity"];

      fields.forEach((field) => {
        if (req.body.hasOwnProperty(field)) {
          item[field] = req.body[field];
        }
      });

      item.status = "pending";

      item.save();
      res.status(200).json(item);
    })
    .catch(() => {
      res.status(404).json({ error: "Item could not be found" });
    });
});

//@routes POST api/items
//@desc Get items
router.get("/", async (req, res) => {
  const storeId = req.query.storeId;
  const findTerm = storeId ? { storeId } : { status: "approved" };
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);

  const sortCriterion: number = Number(req.query.sortCriterion);
  // const page = Number(req.query.page) || 0;
  // const size = Number(req.query.size) || RESULTS_PER_PAGE;

  const sortTerm = {};

  sortCriterion === 0
    ? {}
    : sortCriterion === 1
    ? (sortTerm["$natural"] = -1)
    : (sortTerm["unitPrice"] = 1);

  try {
    const items = await Item.find(findTerm).sort(sortTerm);
    // .skip(RESULTS_PER_PAGE * page)
    // .limit(size);

    if (sortCriterion === 0) {
      items.forEach(async (item: any) => {
        const store: any = await Store.findById(item.storeId);
        item.distance = distance(
          latitude,
          longitude,
          store.position.lat,
          store.position.lng
        );
      });
      items.sort(compare);
    }

    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Items could not be retrieved" });
  }
});

function compare(a, b) {
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  return 0;
}

function distance(lat1, lon1, lat2, lon2) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; // get in KM

  return dist;
}

export default router;
