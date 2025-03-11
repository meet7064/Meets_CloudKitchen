import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken"); // User token

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch orders.");
          return;
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("An error occurred while fetching orders.");
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.map((order) => (
            console.log("Order Debug:", order),
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              {/* 🖼️ Show first menu item image or placeholder */}
              <img
                src={order.items.img|| "/placeholder.jpg"}
                alt={order.items[0]?.menuItem?.name || "No Image"}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* 📛 Show user name */}
              <h2 className="text-lg font-semibold mt-2">
                {order.name ? order.user.name: "Unknown User"}
              </h2>

              {/* 📜 Show order status */}
              <p className="text-gray-600">Status: <span className="font-bold">{order.status}</span></p>

              {/* 🛍️ Show items ordered */}
              <ul className="mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {item.menuItem?.name} - {item.quantity}x
                  </li>
                ))}
              </ul>

              {/* 💰 Show total price */}
              <p className="text-green-600 font-bold mt-2">Total: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
