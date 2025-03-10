const express = require("express");
const { getMenu, addMenuItem } = require("../controllers/menuController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getMenu);
router.post("/", protect, addMenuItem);

module.exports = router;
