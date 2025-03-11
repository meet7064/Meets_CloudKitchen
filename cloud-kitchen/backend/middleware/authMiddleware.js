const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // ✅ Check if token is decoded correctly

      let user = null;

      if (decoded.role === "admin") {
        user = await Admin.findById(decoded.id).select("-password");
      } else {
        user = await User.findById(decoded.id).select("-password");
      }

      console.log("User Found:", user); // ✅ Check if user is found

      if (!user) {
        console.log("User not found in database");
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      req.user.role = decoded.role; // ✅ Ensure role is passed to next middleware
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = { protect };


// Middleware to check admin access
const adminOnly = (req, res, next) => {
  console.log("Checking admin access. User data:", req.user); // ✅ Debug log

  if (req.user && req.user.role === "admin") {
    return next();
  }

  console.log("User is NOT an admin!");
  return res.status(403).json({ message: "Not authorized as admin" });
};

module.exports = { protect, adminOnly };
