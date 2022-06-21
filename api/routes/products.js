const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests for /products",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST requests for /products",
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID!",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID!",
      id: id,
    });
  }
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Updated product!",
    id: id,
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Deleted product!",
    id: id,
  });
});

module.exports = router;
