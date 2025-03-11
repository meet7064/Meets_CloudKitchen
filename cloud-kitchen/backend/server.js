const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", require("./routes/adminRoutes")); // Make sure this is correct
app.use("/api/users", userRoutes); 

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
