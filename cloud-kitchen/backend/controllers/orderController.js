const Order = require("../models/Orders"); // Ensure Order model is imported
const MenuItem = require("../models/MenuItem"); // Ensure MenuItem model is imported

// ✅ Place an order (User)
const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }

    const newOrder = new Order({
      user: req.user._id, // Ensure `req.user` is set in middleware
      items,
      totalPrice,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all orders (Admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // Ensure user data is populated
      .populate("items.menuItem", "name price");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export all functions
module.exports = { placeOrder, getOrders, updateOrderStatus };
