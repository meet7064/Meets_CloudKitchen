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

  // const updateStatus = async (id, status) => {
  //   const token = localStorage.getItem("adminToken");

  //   try {
  //     await axios.put(
  //       `http://localhost:5001/api/orders/${id}/status`,
  //       { status },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === id ? { ...order, status } : order
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("adminToken");
  
    try {
      const response = await axios.put(
        `http://localhost:5001/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // ✅ Use updated order data from backend response
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.map((order) => (
        <div key={order._id} className="p-4 border-b">
          {/* <p><strong>User:</strong> {order.user.name}</p> */}
          <p><strong>Total:</strong> ${order.totalPrice}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.status}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
