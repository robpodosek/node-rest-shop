const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Connect to Mongo Atlas
const db =
  "mongodb+srv://node-rest-shop:" +
  process.env.MONGO_ATLAS_PW +
  "@node-rest-shop.ubxj8.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Routes that handle requests
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;
