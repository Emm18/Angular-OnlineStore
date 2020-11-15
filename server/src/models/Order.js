const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  orderNumber: {
    type: String,
  },
  estimatedShipping: {
    type: String,
  },
  cart: [
    new mongoose.Schema({
      product: new mongoose.Schema({
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
      }),
      quantity: {
        type: Number,
      },
    }),
  ],
  total: {
    type: Number,
  },
  status: {
    type: String,
  },
});

mongoose.model("Order", orderSchema);
