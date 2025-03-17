import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, UserPlus } from "lucide-react";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/super-admin/admins", {
        headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` },
      });
      setAdmins(res.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // ✅ Handle Edit Click
  const handleEditClick = (admin) => {
    setEditingAdmin(admin._id);
    setFormData({ name: admin.name, email: admin.email });
  };

  // ✅ Handle Update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/super-admin/admin/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` },
      });

      alert("Admin updated successfully!");
      setEditingAdmin(null);
      fetchAdmins();
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/super-admin/admin/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` },
      });

      alert("Admin deleted successfully!");
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Super Admin Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Admins</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
        >
          <UserPlus size={20} />
          Create Admin
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <div key={admin._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center transition-all hover:scale-105">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
              {admin.name.charAt(0)}
            </div>
            {editingAdmin === admin._id ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border p-2 mt-2 w-full text-center"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border p-2 mt-2 w-full text-center"
                />
                <button onClick={() => handleUpdate(admin._id)} className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                  ✅ Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mt-2">{admin.name}</h3>
                <p className="text-gray-600">{admin.email}</p>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleEditClick(admin)} className="text-yellow-500 hover:text-yellow-600 transition-all">
                    <Pencil size={22} />
                  </button>
                  <button onClick={() => handleDelete(admin._id)} className="text-red-500 hover:text-red-600 transition-all">
                    <Trash2 size={22} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
