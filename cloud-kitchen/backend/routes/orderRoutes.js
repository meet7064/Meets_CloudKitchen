const express = require("express");
const { placeOrder, getOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware"); 

const router = express.Router();

// ✅ Fix: Remove `/orders`, since `/api/orders` is already set in `server.js`
router.post("/", protect, placeOrder);

// ✅ Fix: Ensure `/` is used for fetching orders
router.get("/", protect, getOrders);

// ✅ Fix: Remove `/orders/`, use `/:id/status`
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
