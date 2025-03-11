const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // URL to the image
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
