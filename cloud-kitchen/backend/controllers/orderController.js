const Order = require("../models/Orders");

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("user").populate("items");
  res.json(orders);
};

exports.placeOrder = async (req, res) => {
  const { userId, items } = req.body;
  const order = new Order({ user: userId, items });
  await order.save();
  res.status(201).json(order);
};
