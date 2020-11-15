const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

mongoose.model("Product", productSchema);
