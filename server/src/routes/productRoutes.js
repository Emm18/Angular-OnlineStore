const express = require("express");
const mongoose = require("mongoose");

const requireAuth = require("../middlewares/requireAuth");
const Product = mongoose.model("Product");

const router = express.Router();

router.use(requireAuth);

router.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/productById", async (req, res) => {
  const product = await Product.findOne({ _id: req.query });
  res.send(product);
});

router.post("/saveProduct", async (req, res) => {
  const { name, imgUrl, description, price } = req.body;
  const product = new Product({ name, imgUrl, description, price });
  await product.save();
  res.send(product);
});

module.exports = router;
