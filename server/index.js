const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const { MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const app = express();

const siteRoutes = require("./SiteController");

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

// // Handle production
// if (process.env.NODE_ENV === "production") {
//   // Static folder
//   app.use(express.static(__dirname + "/public/"));

//   // Handle SPA
//   // refers to any route, so it doesnt look for a page like in a MPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + "./public/index.html"));
// }

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`***** Server running at port ${port} *****`)
);
