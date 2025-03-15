import { useState, useEffect } from "react";
import axios from "axios";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });
  const [message, setMessage] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const token = localStorage.getItem("adminToken");

  // Fetch menu items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        setMessage("❌ Failed to fetch menu items.");
      }
    };
    fetchMenu();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "image") {
      setPreviewImage(e.target.value);
    }
  };

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setForm({ ...form, image: response.data.imageUrl });
      setPreviewImage(response.data.imageUrl);
    } catch (error) {
      setMessage("❌ Failed to upload image.");
    }
  };

  // Add or Update Menu Item
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !form.image) {
      setMessage("⚠️ Please fill out all fields.");
      return;
    }

    try {
      const url = editItemId
        ? `http://localhost:5001/api/menu/${editItemId}`
        : "http://localhost:5001/api/menu";

      const method = editItemId ? "PUT" : "POST";

      await axios({
        method,
        url,
        headers: { Authorization: `Bearer ${token}` },
        data: form,
      });

      setMessage(editItemId ? "✅ Item updated!" : "✅ Item added!");
      setForm({ name: "", description: "", price: "", image: "" });
      setPreviewImage("");
      setEditItemId(null);

      const response = await axios.get("http://localhost:5001/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      setMessage("❌ Failed to update menu.");
    }
  };

  // Delete Item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setMessage("🗑️ Item deleted successfully.");
    } catch (error) {
      setMessage("❌ Failed to delete menu item.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">📋 Manage Menu</h1>

      {/* 📌 Message Box */}
      {message && <p className="text-center text-white py-2 px-4 rounded-lg bg-green-500 mb-4">{message}</p>}

      {/* 📌 Form to Add/Edit Menu */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{editItemId ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" />
          <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" />

          {/* Image Upload OR URL */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Choose Image Upload or URL</label>

            {/* Upload Image */}
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 mr-2 inline-block">
              Upload Image
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>

            {/* OR Enter Image URL */}
            <input type="text" name="image" placeholder="Or Enter Image URL" value={form.image} onChange={handleChange} className="w-full p-3 border rounded mt-2" />

            {/* Image Preview */}
            {previewImage && (
              <div className="mt-3 flex justify-center">
                <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
              </div>
            )}
          </div>

          <button type="submit" className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
            {editItemId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      {/* 📌 List of Menu Items */}
      <h2 className="text-2xl font-bold mb-4">🍔 Menu Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-2">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-bold mt-2">${item.price}</p>
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={() => { setEditItemId(item._id); setForm(item); setPreviewImage(item.image); }} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all">
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
