const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Order = require("../models/Orders");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "User logged in", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get User Profile & Order History
exports.getUserProfile = async (req, res) => {
  try {
    // 📌 Ensure user ID is from token
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // 🔍 Find user by ID (Now Fetching Address)
    const user = await User.findById(req.user._id).select("name email address"); // ✅ Fetch name, email, and address

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🛍️ Fetch user's orders
    const orders = await Order.find({ user: req.user._id })
      .populate("items.menuItem", "name price image")
      .sort({ createdAt: -1 });

    res.json({ 
      user: {
        name: user.name,
        email: user.email,
        address: user.address || "No Address Provided", // ✅ Ensure address is included
      },
      orders
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;

    // 🔑 Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


