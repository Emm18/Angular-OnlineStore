require("./models/User");
require("./models/Product");
require("./models/Order");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("../config/keys");

//ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

//ALLOWING CORS - for same machine server
app.use(cors());

//MIDDLEWARES
app.use(bodyParser.json());
app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);

//MONGODB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true); //To get rid of the deprecation warning

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", () => {
  console.error("error", error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
