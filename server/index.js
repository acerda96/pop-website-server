const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const { MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const app = express();

const siteRoutes = require("./controllers/SiteController");
const userRoutes = require("./controllers/account/AccountController");
const itemsRoutes = require("./controllers/items/ItemsController");
const storesRoutes = require("./controllers/stores/StoreController");

// Middleware
app.use(bodyParse.json());
app.use(cors());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("----- Mongo DB connected! -----"))
  .catch((err) => console.log("----- Failed to connect to MongoDB -----", err));

app.use("/api", siteRoutes);
app.use("/api/account", userRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/stores", storesRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`***** Server running at port ${port} *****`)
);
