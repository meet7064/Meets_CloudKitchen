const express = require("express");
const { getOrders, placeOrder } = require("../controllers/orderController"); // Ensure correct import
const { protect, adminOnly } = require("../middleware/authMiddleware"); // Import updated middleware

const router = express.Router();

// Get all orders (Admin Only)
router.get("/", protect, adminOnly, getOrders);

// Place a new order (User Only)
router.post("/", protect, placeOrder);

module.exports = router;
