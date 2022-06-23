const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// Create a Product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created Product successfully",
        product: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get all Products
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get a Product
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .select("name price _id")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "Get all Products",
            url: "http://localhost:3000/products/",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID: " + id });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update a Product
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete a Product
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          body: { name: "String", price: "Integer" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
