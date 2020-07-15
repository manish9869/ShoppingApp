const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const CategoryRoutes = require("./routes/category");
const SubCategoryRoutes = require("./routes/sub-category");

const app = express();

mongoose
  .connect(
    "mongodb+srv://manish:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-cxtx2.mongodb.net/nodeAngulardb",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/subcategory", SubCategoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", CategoryRoutes);

module.exports = app;
