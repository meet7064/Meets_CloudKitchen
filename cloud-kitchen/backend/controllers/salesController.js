const Order = require("../models/Orders");
const User = require("../models/User");

exports.getSalesReport = async (req, res) => {
  try {
    // 🔍 Fetch total customers
    const totalCustomers = await User.countDocuments();

    // 🔍 Fetch total orders
    const totalOrders = await Order.countDocuments();

    // 🔍 Fetch total revenue
    const orders = await Order.find().populate("user", "name").populate("items.menuItem", "name price");

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    // 📝 Transform order data
    const salesData = orders.map((order) => ({
      user: order.user?.name || "Unknown",
      items: order.items.map((item) => ({
        product: item.menuItem?.name || "Unknown",
        price: item.menuItem?.price || 0,
      })),
      totalAmount: order.totalPrice || 0,
      date: order.createdAt.toISOString().split("T")[0], // Format date
    }));

    res.json({
      totalCustomers,
      totalOrders,
      totalRevenue,
      salesData,
    });
  } catch (error) {
    console.error("Error fetching sales report:", error);
    res.status(500).json({ message: "Failed to fetch sales report" });
  }
};
