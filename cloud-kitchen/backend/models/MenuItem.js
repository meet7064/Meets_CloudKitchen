const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
