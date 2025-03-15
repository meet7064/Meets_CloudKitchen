import React, { useState } from "react";
import axios from "axios";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔄 Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Clear previous messages
  };

  // ✅ Handle Create Admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/super-admin/create-admin",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("superAdminToken")}` } }
      );

      setMessage("✅ Admin created successfully!");
      setFormData({ name: "", email: "", password: "" }); // Reset form after success
    } catch (err) {
      setMessage("❌ Failed to create admin. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Admin</h2>

      {message && <p className={`text-sm mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}>{message}</p>}

      <form onSubmit={handleCreateAdmin} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Admin Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
