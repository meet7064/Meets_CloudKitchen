import { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No admin token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await axios.put(
        `http://localhost:5001/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: response.data.order.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
              {/* Order Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Order #{order._id.slice(-6)}</h2>
                  <p className="text-gray-600">User: {order.user?.name || "Unknown User"}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-white ${order.status === "Pending" ? "bg-yellow-500" : order.status === "Processing" ? "bg-blue-500" : order.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}>
                  {order.status}
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                    <img
                      src={item.menuItem?.image || "/placeholder.jpg"}
                      alt={item.menuItem?.name || "Item"}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">{item.menuItem?.name || "No Name"}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Status Update */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-xl font-bold text-gray-900">Total: ${order.totalPrice}</p>
                <div>
                  <label className="text-gray-700 font-medium mr-2">Update Status:</label>
                  <select 
                    onChange={(e) => updateStatus(order._id, e.target.value)} 
                    value={order.status}
                    className="border p-2 rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
