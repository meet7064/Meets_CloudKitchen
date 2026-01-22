import { useState, useEffect } from "react";
import axios from "axios";
import { Package, Clock, CheckCircle, XCircle, ShoppingBag, User } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("🔒 Access denied. Please log in to your studio.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError("❌ Could not retrieve market orders.");
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
      console.error("Status update failed:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed": return "bg-stone-100 text-stone-800 border-stone-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 lg:p-12 bg-[#FDFCF8] min-h-screen text-stone-900">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight">
          <ShoppingBag className="text-amber-700" size={32} />
          Fulfillment Desk
        </h1>
        <p className="text-stone-500 mt-2">Manage community requests and update your artisan fulfillment progress.</p>
      </header>

      {error && <p className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</p>}

      {orders.length === 0 ? (
        <div className="bg-white border border-stone-100 p-12 rounded-3xl text-center shadow-sm">
          <p className="text-stone-400 italic">No community orders have been placed yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
              {/* Order Header */}
              <div className="bg-stone-50 px-6 py-4 flex justify-between items-center border-b border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-stone-200">
                    <Package className="text-stone-400" size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-stone-800">Order #{order._id.slice(-6).toUpperCase()}</h2>
                    <p className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                      <User size={12} /> {order.user?.name || "Neighbor"}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${getStatusStyle(order.status)}`}>
                  {order.status === "Pending" && <Clock size={14} />}
                  {order.status === "Completed" && <CheckCircle size={14} />}
                  {order.status === "Cancelled" && <XCircle size={14} />}
                  {order.status}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-[#FDFCF8] p-3 rounded-2xl border border-stone-50">
                      <img
                        src={item.menuItem?.image || "/placeholder.jpg"}
                        alt={item.menuItem?.name}
                        className="w-16 h-16 object-cover rounded-xl shadow-sm"
                      />
                      <div>
                        <p className="text-sm font-bold text-stone-800">{item.menuItem?.name || "Artisan Good"}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Footer */}
              <div className="px-6 py-5 bg-stone-50/50 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Total Support</span>
                  <span className="text-2xl font-black text-stone-900">${order.totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-tight">Status Update:</label>
                  <select 
                    onChange={(e) => updateStatus(order._id, e.target.value)} 
                    value={order.status}
                    className="bg-white border border-stone-200 text-stone-700 text-sm font-bold py-2 px-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
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