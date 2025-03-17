const express = require("express");
const { createAdmin, getAllAdmins, superAdminLogin, updateAdmin, deleteAdmin, getAdminActivity } = require("../controllers/superAdminController");
const { protectSuperAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", superAdminLogin);
router.post("/create-admin", protectSuperAdmin, createAdmin);
router.get("/admins", protectSuperAdmin, getAllAdmins);

router.put("/admin/:id", protectSuperAdmin, updateAdmin); // ✅ Update Admin
router.delete("/admin/:id", protectSuperAdmin, deleteAdmin); // ✅ Delete Admin

router.get("/admins/:id/activity", protectSuperAdmin, getAdminActivity);

module.exports = router;
