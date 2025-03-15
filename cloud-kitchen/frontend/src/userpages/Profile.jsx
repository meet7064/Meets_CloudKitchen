import { useEffect, useState } from "react";
import axios from "axios";

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
        setError("⚠️ No token found. Please log in.");
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
        } else {
          setError("❌ Failed to load user information.");
        }
      } catch (err) {
        setError("❌ Failed to load profile.");
      }
    };

    fetchProfile();
  }, [token]);

  // 🔄 Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5001/api/users/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      setEditing(false); // Exit edit mode
    } catch (err) {
      alert("❌ Failed to update profile.");
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">👤 Profile</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ User Profile */}
      {user && !editing ? (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start">
          <img
            src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${user.name}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left w-full">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 mt-1">📍 {user.address || "No Address Provided"}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      ) : (
        user && (
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (Optional)"
              className="w-full p-2 border rounded mb-3"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2">
              ✅ Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              ❌ Cancel
            </button>
          </form>
        )
      )}

      {/* ✅ Saved Addresses */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold">📍 Saved Addresses</h2>
        <p className="text-gray-600 mt-2">{formData?.address || "No saved addresses."}</p>
      </div>

      {/* ✅ Order History */}
      <h2 className="text-2xl font-bold mt-6">🛍️ Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 mt-2">No past orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              {/* 🖼️ Show first menu item image */}
              <img
                src={order.items[0]?.menuItem?.image || "/placeholder.jpg"}
                alt={order.items[0]?.menuItem?.name || "No Image"}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="text-gray-700 mt-2"><strong>Status:</strong> {order.status}</p>
              <ul className="text-sm text-gray-600 mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.menuItem?.name} - {item.quantity}x
                  </li>
                ))}
              </ul>
              <p className="text-green-600 font-bold mt-2">Total: ${order.totalPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
