const MenuItem = require("../models/MenuItem");

exports.getMenu = async (req, res) => {
  const menu = await MenuItem.find();
  res.json(menu);
};

exports.addMenuItem = async (req, res) => {
  const { name, price, description, image } = req.body;
  const newItem = new MenuItem({ name, price, description, image });
  await newItem.save();
  res.status(201).json(newItem);
};
