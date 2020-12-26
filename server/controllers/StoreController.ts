import express from "express";
import Item from "../models/ItemModel";
import Store from "../models/StoreModel";
import verifyToken from "../utils/verifyToken";
import StoreInterface from "../types/Store";

const router = express.Router();
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
    Store.find({ status: "approved" })
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
router.post("/", verifyToken, (req: any, res) => {
  const newStore = new Store({
    ...req.body,
    userId: req.user.id,
    status: "pending",
  });
  newStore
    .save()
    .then((store) => {
      res.status(201).json(store);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Could not add store" });
    });
});

//@routes PUT api/stores
//@desc Edit a store
router.put("/:id", verifyToken, (req, res) => {
  Store.findById(req.params.id)
    .then((store: any) => {
      console.log(req.body);

      const fields = [
        "name",
        "description",
        "addressLine1",
        "addressLine2",
        "postcode",
        "city",
        "position",
        "dates",
      ];

      fields.forEach((field) => {
        if (req.body.hasOwnProperty(field)) {
          store[field] = req.body[field];
        }
      });

      store.status = "pending";

      store.save();
      res.status(200).json(store);
    })
    .catch(() => {
      res.status(404).json({ error: "Store could not be found" });
    });
});

//@routes DELETE api/stores
//@desc Delete a store
router.delete("/:id", verifyToken, (req, res) => {
  Store.findById(req.params.id)
    .then((store: any) => {
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

export default router;
