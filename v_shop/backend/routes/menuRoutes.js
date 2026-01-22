const express = require("express");
const MenuItem = require("../models/MenuItem");
const { protect, adminOnly } = require("../middleware/authMiddleware"); // Import updated middleware

const router = express.Router();

// Allow public access to fetch menu
router.get("/", async (req, res) => {
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

// Update an existing menu item (Admin Only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu item" });
  }
});

// Delete a menu item (Admin Only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu item" });
  }
});

module.exports = router;
