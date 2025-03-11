import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

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
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold">{order.user.name}</h2>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
