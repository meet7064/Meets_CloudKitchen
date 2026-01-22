const Admin = require("../models/Admin");
const AdminActivityLog = require("../models/AdminActivityLog");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ message: "Admin already exists" });

    admin = new Admin({ name, email, password });
    await admin.save();

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ message: "Admin registered", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Admin logged in", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, price, description } = req.body;

    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.name = name;
    menuItem.price = price;
    menuItem.description = description;
    await menuItem.save();

    // ✅ Log admin activity
    await AdminActivityLog.create({
      adminId: req.admin._id, // Ensure admin ID is passed from middleware
      action: `Updated menu item: ${name}`,
    });

    res.json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};