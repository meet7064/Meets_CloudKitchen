import React, { useEffect, useState } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/super-admin/admins", {
          headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` }
        });
        setAdmins(res.data);
      } catch (err) {
        console.error("Error fetching admins");
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <h3>All Admins</h3>
      <ul>
        {admins.map(admin => (
          <li key={admin._id}>{admin.name} - {admin.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuperAdminDashboard;
