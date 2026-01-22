const express = require("express");
const { getSalesReport } = require("../controllers/salesController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get Sales Report (Admin Only)
router.get("/", protect, adminOnly, getSalesReport);

module.exports = router;
