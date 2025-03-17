import React, { useState, useEffect } from "react";
import axios from "axios";
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
      console.error("Error fetching admins:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">📋 Admins</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 my-3 w-full"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins
            .filter((admin) =>
              admin.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((admin) => (
              <tr key={admin._id}>
                <td className="border px-4 py-2">{admin.name}</td>
                <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedAdmin(admin)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    View Activity
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selectedAdmin && <AdminActivity admin={selectedAdmin} />}
      <ExportCSV admins={admins} />
    </div>
  );
};

export default AdminList;
