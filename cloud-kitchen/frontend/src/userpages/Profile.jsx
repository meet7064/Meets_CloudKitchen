import { useEffect, useState } from "react";
import axios from "axios";
import { User, MapPin, History, Settings, LogOut, Check, X } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "", password: "" });
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("🌿 Please sign in to access your artisan account.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.user) {
          setUser(res.data.user);
          setOrders(res.data.orders);
          setFormData({
            name: res.data.user.name,
            email: res.data.user.email,
            address: res.data.user.address || "",
            password: "",
          });
        }
      } catch (err) {
        setError("❌ Failed to load your profile details.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5001/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✨ Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      alert("❌ Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-6 md:p-12 max-w-5xl mx-auto text-stone-900">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <User className="text-amber-700" size={32} />
          My Account
        </h1>
        <p className="text-stone-500 mt-1 font-medium">Manage your local marketplace identity.</p>
      </header>

      {error && <p className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</p>}

      {/* ✅ User Profile Card */}
      <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm mb-10">
        {user && !editing ? (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`}
                alt="User Avatar"
                className="w-32 h-32 rounded-2xl bg-amber-50 border-2 border-stone-100 object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-stone-500 font-medium">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-800 mt-2">
                <MapPin size={16} />
                <span className="text-sm">{user.address || "No delivery address saved"}</span>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="mt-6 flex items-center gap-2 px-6 py-2 bg-stone-800 text-white rounded-full font-bold hover:bg-amber-800 transition-all shadow-md"
              >
                <Settings size={18} /> Edit Profile
              </button>
            </div>
          </div>
        ) : (
          user && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Update Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 outline-none"
                />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Delivery Address"
                className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 outline-none"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password (Keep blank to leave unchanged)"
                className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 outline-none"
              />
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex items-center gap-2 bg-stone-800 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                  <Check size={18} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-2 bg-stone-100 text-stone-600 px-6 py-2 rounded-full font-bold"
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            </form>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ✅ Address Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h2 className="text-xl font-bold flex items-center gap-2 text-amber-900 mb-4">
              <MapPin size={22} /> Primary Address
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm">
              {user?.address || "Please add an address to streamline your future artisan orders."}
            </p>
          </div>
        </div>

        {/* ✅ Order History Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <History className="text-amber-700" size={24} /> 
            Recent Market Purchases
          </h2>
          {orders.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-dashed border-stone-200 text-center">
              <p className="text-stone-400">Your basket hasn't been to the market yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img
                    src={order.items[0]?.menuItem?.image || "/placeholder.jpg"}
                    alt="Order Item"
                    className="w-20 h-20 object-cover rounded-xl bg-stone-100"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-mono text-stone-400 uppercase tracking-tighter">#{order._id.slice(-6)}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 uppercase tracking-widest">
                        {order.status}
                      </span>
                    </div>
                    <p className="font-bold text-stone-800 mt-1">
                      {order.items.length} {order.items.length === 1 ? 'Handcrafted Item' : 'Items from the Market'}
                    </p>
                    <p className="text-amber-700 font-bold text-sm mt-1">
                      Total Support: ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;