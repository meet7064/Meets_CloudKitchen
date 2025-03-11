const Admin = require("../models/Admin");
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
