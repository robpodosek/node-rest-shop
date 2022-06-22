const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders were fetched",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "Order was created",
    order: order,
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Order details",
    id: id,
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: "Order deleted",
    id: id,
  });
});

module.exports = router;
