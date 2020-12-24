import express from "express";
import bodyParse from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import siteRoutes from "./controllers/SiteController";
import accountRoutes from "./controllers/AccountController";
import individualRoutes from "./controllers/IndividualController";
import itemsRoutes from "./controllers/ItemsController";
import storesRoutes from "./controllers/StoreController";

declare global {
  namespace Express {
    interface Request {
      user: {id: string}; 
      files: any;
    }
  }
}

const app = express();

app.use(bodyParse.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("----- Mongo DB connected! -----"))
  .catch((err) => console.log("----- Failed to connect to MongoDB -----", err));

app.use("/", siteRoutes);
app.use("/individual", individualRoutes);
app.use("/account", accountRoutes);
app.use("/items", itemsRoutes);
app.use("/stores", storesRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`***** Server running at port ${port} *****`)
);
