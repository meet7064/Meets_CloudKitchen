const SuperAdmin = require("../models/SuperAdmin");
const AdminActivityLog = require("../models/AdminActivityLog");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Super Admin Login
exports.superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const superAdmin = await SuperAdmin.findOne({ email });

    if (!superAdmin || !(await bcrypt.compare(password, superAdmin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: superAdmin._id, role: "superadmin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, superAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Create New Admin (Only Super Admin)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    // Log the action
    await AdminActivityLog.create({
      admin: req.user.id,
      action: `Created new admin: ${name}`
    });

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Admins (Super Admin Only)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // Exclude password
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Admin Details
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    await admin.save();

    res.json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin" });
  }
};

// ✅ Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await admin.deleteOne();

    // Log the action
    await AdminActivityLog.create({
      admin: req.user.id,
      action: `Deleted admin: ${admin.name}`
    });
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin" });
  }
};

exports.getAdminActivity = async (req, res) => {
  try {
    const adminId = req.params.id;

    // 🛑 Ensure the admin ID is provided
    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    // 🔍 Fetch logs related to the admin
    const logs = await AdminActivityLog.find({ admin: adminId }).sort({ timestamp: -1 });

    // 🛑 Check if logs exist
    if (!logs.length) {
      return res.status(404).json({ message: "No activity logs found for this admin" });
    }

    res.json(logs);
  } catch (error) {
    console.error("Error fetching admin activity logs:", error);
    res.status(500).json({ message: "Server error while fetching activity logs" });
  }
};