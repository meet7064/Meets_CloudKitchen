import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Store } from "lucide-react";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });
  const [message, setMessage] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const token = localStorage.getItem("adminToken");

  // Fetch items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        setMessage("❌ Failed to fetch the collection.");
      }
    };
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") setPreviewImage(e.target.value);
  };

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
      setMessage("❌ Failed to upload artisan image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.image) {
      setMessage("⚠️ Please provide all details for your handcrafted item.");
      return;
    }

    try {
      const url = editItemId ? `http://localhost:5001/api/menu/${editItemId}` : "http://localhost:5001/api/menu";
      const method = editItemId ? "PUT" : "POST";

      await axios({ method, url, headers: { Authorization: `Bearer ${token}` }, data: form });

      setMessage(editItemId ? "✨ Item updated in your gallery!" : "✨ New item added to your collection!");
      setForm({ name: "", description: "", price: "", image: "" });
      setPreviewImage("");
      setEditItemId(null);

      const response = await axios.get("http://localhost:5001/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      setMessage("❌ Failed to update collection.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this item from your shop?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setMessage("🗑️ Item removed from shop.");
    } catch (error) {
      setMessage("❌ Failed to delete item.");
    }
  };

  return (
    <div className="p-8 lg:p-12 bg-[#FDFCF8] min-h-screen text-stone-900">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <Store className="text-amber-700" size={32} />
          Collection Manager
        </h1>
        <p className="text-stone-500 mt-2">Add, edit, or curate the goods available in your shop.</p>
      </header>

      {message && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-4">
          <p className="text-center bg-stone-900 text-white py-3 px-6 rounded-xl font-bold shadow-lg">
            {message}
          </p>
        </div>
      )}

      {/* 📌 Form Section */}
      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-6 text-stone-800 flex items-center gap-2">
          {editItemId ? <Pencil size={20} className="text-amber-700" /> : <Plus size={20} className="text-amber-700" />}
          {editItemId ? "Refine Item Details" : "Feature New Craft"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input type="text" name="name" placeholder="Item Name (e.g. Sourdough Loaf)" value={form.name} onChange={handleChange} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
            <textarea name="description" placeholder="The story behind this item..." value={form.description} onChange={handleChange} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none h-24" />
            <input type="number" name="price" placeholder="Price ($)" value={form.price} onChange={handleChange} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-stone-200 bg-stone-50 rounded-2xl p-6 transition-colors hover:border-amber-300">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md mb-4" />
              ) : (
                <ImageIcon className="text-stone-300 mb-2" size={48} />
              )}
              
              <div className="flex gap-2">
                <label className="bg-stone-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-800 transition-colors text-sm font-bold flex items-center gap-2">
                  <Upload size={16} /> Upload
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <input type="text" name="image" placeholder="Or paste image link..." value={form.image} onChange={handleChange} className="w-full mt-4 p-2 text-xs bg-white border border-stone-200 rounded-lg text-center" />
            </div>

            <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-amber-800 transition-all active:scale-95">
              {editItemId ? "Confirm Updates" : "Add to Collection"}
            </button>
            {editItemId && <button onClick={() => { setEditItemId(null); setForm({ name: "", description: "", price: "", image: "" }); setPreviewImage(""); }} className="w-full text-stone-400 font-bold text-sm">Cancel Editing</button>}
          </div>
        </form>
      </div>

      {/* 📌 Display Section */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">Your Live Shopfront</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-xl group">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-stone-800">{item.name}</h3>
              <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
              <p className="text-amber-800 font-bold mt-3">${item.price}</p>
              
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setEditItemId(item._id); setForm(item); setPreviewImage(item.image); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex-1 flex items-center justify-center gap-2 bg-stone-100 text-stone-600 py-2 rounded-lg hover:bg-stone-200 transition-colors text-sm font-bold">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-stone-400 hover:text-red-600 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;