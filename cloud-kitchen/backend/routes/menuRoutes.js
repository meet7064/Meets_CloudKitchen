const express = require("express");
const MenuItem = require("../models/MenuItem");
const { protect, adminOnly } = require("../middleware/authMiddleware"); // Import updated middleware

const router = express.Router();

// Fetch all menu items (Accessible to all logged-in users)
router.get("/", protect, async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
});

// Add a new menu item (Admin Only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({ name, description, price, image });
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully", newItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to add menu item" });
  }
});

module.exports = router;
