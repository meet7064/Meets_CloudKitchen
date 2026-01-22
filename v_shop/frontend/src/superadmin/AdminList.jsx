import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, UserCircle, History, Download, Filter } from "lucide-react";
import AdminActivity from "./AdminActivity";
import ExportCSV from "./ExportCSV";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("superadminToken");
      const res = await axios.get("http://localhost:5001/api/super-admin/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (error) {
      console.error("Error fetching vendor directory:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Page Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Vendor Directory</h2>
            <p className="text-stone-500 text-sm">Review and monitor all registered artisan shop owners.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
                <input
                  type="text"
                  placeholder="Search artisans..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 w-full md:w-64 transition-all"
                />
             </div>
             <button className="p-2 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 transition-colors">
                <Filter size={20} />
             </button>
          </div>
        </header>

        {/* ✅ Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="px-6 py-4 text-stone-600 font-bold text-xs uppercase tracking-widest">Artisan / Shop</th>
                <th className="px-6 py-4 text-stone-600 font-bold text-xs uppercase tracking-widest">Contact Email</th>
                <th className="px-6 py-4 text-stone-600 font-bold text-xs uppercase tracking-widest text-right">Market Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {admins
                .filter((admin) =>
                  admin.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((admin) => (
                  <tr key={admin._id} className="hover:bg-stone-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center font-bold text-sm">
                          {admin.name.charAt(0)}
                        </div>
                        <span className="font-bold text-stone-800">{admin.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm italic">{admin.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedAdmin(admin)}
                        className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-800 transition-all shadow-sm"
                      >
                        <History size={14} />
                        View Activity
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
          {admins.length === 0 && (
             <div className="p-12 text-center text-stone-400 italic">
                No vendors found in the marketplace records.
             </div>
          )}
        </div>

        {/* ✅ Activity Modal/Section */}
        {selectedAdmin && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                    <UserCircle className="text-amber-700" />
                    Activity Log for {selectedAdmin.name}
                </h3>
                <button 
                  onClick={() => setSelectedAdmin(null)}
                  className="text-stone-400 hover:text-stone-800 text-sm font-bold"
                >
                    Close Log
                </button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-inner">
                <AdminActivity admin={selectedAdmin} />
            </div>
          </div>
        )}

        {/* ✅ Export Action */}
        <div className="mt-8 flex justify-end">
            <div className="inline-flex items-center gap-2 bg-white border border-stone-200 px-5 py-2.5 rounded-xl hover:bg-stone-50 transition-colors shadow-sm cursor-pointer">
                <Download size={18} className="text-amber-700" />
                <ExportCSV admins={admins} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminList;