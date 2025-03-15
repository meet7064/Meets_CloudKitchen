const SuperAdmin = require("../models/SuperAdmin");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Super Admin Login
exports.superAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) return res.status(404).json({ message: "Super Admin not found" });

    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: superAdmin._id, role: "superadmin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, superAdmin });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create Admin by Super Admin
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    
    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    console.log("Fetching all admins..."); // Debugging log
    const admins = await Admin.find(); // Make sure 'Admin' model is correct

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


