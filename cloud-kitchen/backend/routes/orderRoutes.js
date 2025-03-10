const express = require("express");
const { getOrders, placeOrder } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders);
router.post("/", protect, placeOrder);

module.exports = router;
