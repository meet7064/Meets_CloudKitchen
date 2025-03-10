const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
