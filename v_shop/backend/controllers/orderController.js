const Order = require("../models/Orders"); // ✅ Ensure Order model is imported
const MenuItem = require("../models/MenuItem"); // ✅ Ensure MenuItem model is imported

// ✅ Place an order (User)
const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain items" });
    }

    // ✅ Calculate total price from items
    let totalPrice = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(400).json({ message: `Invalid menu item: ${item.menuItem}` });
      }
      totalPrice += item.quantity * menuItem.price;
    }

    const user = req.user;

    const order = new Order({
      user: user._id, // ✅ Store user ID only, use `.populate()` to get details later
      items,
      totalPrice, // ✅ Ensure totalPrice is included
      status: "Pending",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// ✅ Get all orders (Admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // ✅ Populate user name & email
      .populate("items.menuItem", "name price image"); // ✅ Populate menu items

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Get Logged-in User's Orders (User Only)
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }) // ✅ Fetch orders only for the logged-in user
      .populate("items.menuItem", "name price image") // ✅ Populate menu items
      .sort({ createdAt: -1 }); // ✅ Show latest orders first

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
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
module.exports = { placeOrder, getOrders, getUserOrders, updateOrderStatus };
