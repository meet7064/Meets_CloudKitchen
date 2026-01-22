const express = require("express");
const { placeOrder, getOrders, getUserOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware"); 

const router = express.Router();

// ✅ Place an Order (User Only)
router.post("/", protect, placeOrder);

// ✅ Get Orders for Logged-in User (Fix for 404)
router.get("/user", protect, getUserOrders); 

// ✅ Get All Orders (Admin Only)
router.get("/", protect, adminOnly, getOrders);

// ✅ Update Order Status (Admin Only)
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
