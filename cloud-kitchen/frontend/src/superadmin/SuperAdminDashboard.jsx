import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, UserPlus, ShieldCheck, Mail, Store } from "lucide-react";
import { Link } from "react-router-dom";

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
      console.error("Error fetching vendor accounts:", error);
    }
  };

  const handleEditClick = (admin) => {
    setEditingAdmin(admin._id);
    setFormData({ name: admin.name, email: admin.email });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/super-admin/admin/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` },
      });
      alert("🌿 Vendor details updated successfully!");
      setEditingAdmin(null);
      fetchAdmins();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this vendor partner?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/super-admin/admin/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` },
      });
      alert("🗑️ Vendor removed from the marketplace.");
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-amber-700" size={36} />
              Marketplace Oversight
            </h1>
            <p className="text-stone-500 mt-2 font-medium">Manage and verify local vendor partner accounts.</p>
          </div>
          <Link
            to="/super-admin/create-admin"
            className="w-fit bg-stone-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-amber-800 transition-all shadow-lg font-bold"
          >
            <UserPlus size={20} />
            Onboard New Vendor
          </Link>
        </header>

        <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
          <Store size={20} className="text-amber-700" /> 
          Active Vendor Partners
        </h2>

        {/* ✅ Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {admins.map((admin) => (
            <div key={admin._id} className="bg-white border border-stone-100 shadow-sm rounded-2xl p-6 flex flex-col items-center transition-all hover:shadow-xl hover:-translate-y-1">
              {/* Avatar Circle */}
              <div className="w-20 h-20 bg-stone-50 border-2 border-stone-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-amber-800 shadow-inner mb-4">
                {admin.name.charAt(0)}
              </div>

              {editingAdmin === admin._id ? (
                <div className="w-full space-y-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-stone-200 p-2 rounded-lg text-center focus:ring-2 focus:ring-amber-500 outline-none bg-stone-50"
                    placeholder="Vendor Name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-stone-200 p-2 rounded-lg text-center focus:ring-2 focus:ring-amber-500 outline-none bg-stone-50"
                    placeholder="Email Address"
                  />
                  <div className="flex gap-2 justify-center pt-2">
                    <button onClick={() => handleUpdate(admin._id)} className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-bold">
                      Save Changes
                    </button>
                    <button onClick={() => setEditingAdmin(null)} className="px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center w-full">
                  <h3 className="text-lg font-bold text-stone-900">{admin.name}</h3>
                  <p className="text-stone-500 text-sm flex items-center justify-center gap-1 mt-1">
                    <Mail size={14} /> {admin.email}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-stone-50">
                    <button 
                      onClick={() => handleEditClick(admin)} 
                      className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all"
                      title="Edit Vendor"
                    >
                      <Pencil size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(admin._id)} 
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      title="Remove Vendor"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;