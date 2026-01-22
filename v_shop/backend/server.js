const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const salesRoutes = require("./routes/salesRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes"); // ✅ Import Super Admin Routes


const multer = require("multer");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173", // Replace with your frontend URL
//   credentials: true, // Allow credentials (if using cookies for auth)
// }));
app.use(express.json());


//✅ Connect to MongoDB and Create Super Admin
// const mongoose = require("mongoose");
// const SuperAdmin = require("./models/SuperAdmin");
// const bcrypt = require("bcryptjs");
// const createSuperAdmin = async () => {
//   const existingAdmin = await SuperAdmin.findOne({ email: "superadmin@example.com" });
//   if (!existingAdmin) {
//     const newAdmin = new SuperAdmin({
//       name: "Super Admin",
//       email: "superadmin@example.com",
//       password: "SuperSecurePassword123",
//       role: "superadmin",
//     });
//     await newAdmin.save();
//     console.log("Super Admin created successfully!");
//   } else {
//     console.log("Super Admin already exists.");
//   }
// };

// createSuperAdmin();



app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/super-admin", superAdminRoutes); // ✅ Register Super Admin Routes
app.use("/api/create-admin", superAdminRoutes); // ✅ Register Admin Routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// 📌 Image Upload Route
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
