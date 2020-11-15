const express = require("express");
const mongoose = require("mongoose");

const requireAuth = require("../middlewares/requireAuth");
const Order = mongoose.model("Order");

const router = express.Router();

router.use(requireAuth);

router.get("/orders", async (req, res) => {
  const orders = await Order.find({ email: req.query.email });
  res.send(orders);
});

router.post("/saveOrder", async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    adress,
    orderNumber,
    estimatedShipping,
    cart,
    total,
    status,
  } = req.body.order;
  const order = new Order({
    email,
    firstName,
    lastName,
    adress,
    orderNumber,
    estimatedShipping,
    cart,
    total,
    status,
  });
  await order.save();
  res.send(order);
});

module.exports = router;
