const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer")

const router = express.Router();

// User Registration Route
router.post("/register", registerUser);

// User Login Route
router.post("/login", loginUser);

// ✅ Get user profile
router.get("/profile", protect, getUserProfile);

// ✅ Update user profile (Protected)
router.put("/profile", protect, updateUserProfile);

module.exports = router;
