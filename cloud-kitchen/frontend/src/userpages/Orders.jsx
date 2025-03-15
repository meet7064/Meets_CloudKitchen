import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken"); // ✅ Ensure correct token is used

  console.log("token", token);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("⚠️ No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/orders/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
      } catch (err) {
        setError("❌ Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛍️ Your Orders</h1>
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.map((order) => {
            const firstItem = order.items[0]?.menuItem;
            return (
              <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                {/* 🖼️ Show first menu item image or placeholder */}
                <img
                  src={firstItem?.image || "/placeholder.jpg"}
                  alt={firstItem?.name || "No Image"}
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* 📜 Show order status */}
                <p className="text-gray-600 mt-2">
                  Status: <span className="font-bold">{order.status}</span>
                </p>

                {/* 🛍️ Show ordered items */}
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {item.menuItem?.name} - {item.quantity}x
                    </li>
                  ))}
                </ul>

                {/* 💰 Show total price */}
                <p className="text-green-600 font-bold mt-2">
                  Total: ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
