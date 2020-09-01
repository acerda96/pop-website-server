const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const { MONGO_URI } = require("./config");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(bodyParse.json());
app.use(cors());

const siteRoutes = require("./SiteController");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("----- Mongo DB connected! -----"))
  .catch((err) => console.log("----- Failed to connect to MongoDB -----", err));

app.use("/api", siteRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`***** Server running at port ${port} *****`)
);
