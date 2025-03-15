const express = require("express");
const { createAdmin, getAllAdmins } = require("../controllers/superAdminController");
const router = express.Router();

// ✅ Create a new Admin (Super Admin Functionality)
router.post("/create-admin", createAdmin);

// ✅ Get all Admins (Super Admin Overview)
router.get("/admins", getAllAdmins);

module.exports = router;
