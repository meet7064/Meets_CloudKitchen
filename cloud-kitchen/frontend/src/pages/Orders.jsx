import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold">{order.foodName}</h2>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
