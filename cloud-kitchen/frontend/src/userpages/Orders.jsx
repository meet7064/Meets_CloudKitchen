import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Truck, CheckCircle, Clock, ShoppingBag } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("🔒 Please sign in to view your artisan finds.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/orders/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        setError("❌ We couldn't retrieve your purchase history.");
      }
    };

    fetchOrders();
  }, [token]);

  // ✅ Status Badge Helper
  const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return { icon: <Clock size={16} />, color: "bg-amber-100 text-amber-800", label: "Preparing" };
      case "shipped": return { icon: <Truck size={16} />, color: "bg-blue-100 text-blue-800", label: "On the Way" };
      case "delivered": return { icon: <CheckCircle size={16} />, color: "bg-green-100 text-green-800", label: "Received" };
      default: return { icon: <Package size={16} />, color: "bg-stone-100 text-stone-800", label: status };
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-8 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-stone-200 pb-6">
          <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-3">
            <ShoppingBag className="text-amber-700" size={32} />
            Your Artisan Finds
          </h1>
          <p className="text-stone-500 mt-2">Tracking your support for local creators and small businesses.</p>
        </header>

        {error && <p className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-6">{error}</p>}

        {orders.length === 0 && !error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-400 text-lg">You haven't discovered any treasures yet.</p>
            <button className="mt-4 text-amber-700 font-bold hover:underline">Browse the Marketplace</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {orders.map((order) => {
              const firstItem = order.items[0]?.menuItem;
              const statusInfo = getStatusDetails(order.status);
              
              return (
                <div key={order._id} className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  {/* Image Header */}
                  <div className="h-32 bg-stone-200 relative">
                    <img
                      src={firstItem?.image || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400"}
                      alt="Order Preview"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusInfo.color}`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Order Reference</p>
                        <p className="text-xs font-mono text-stone-600">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-stone-900">
                          ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-stone-800 border-b border-stone-50 pb-1">Items Summary</p>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between text-sm text-stone-600">
                            <span>{item.menuItem?.name} <span className="text-stone-400 font-normal">x{item.quantity}</span></span>
                            <span className="font-medium text-stone-800">
                              ${((item.menuItem?.price || 0) * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-center">
                    <button className="text-stone-500 text-xs font-bold hover:text-amber-700 transition-colors">
                      View Full Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;