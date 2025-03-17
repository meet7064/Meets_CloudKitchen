import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminActivity = ({ admin }) => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      fetchActivity();
    }
  }, [admin]);

  const fetchActivity = async () => {
    try {
      const token = localStorage.getItem("superadminToken");
      const res = await axios.get(
        `http://localhost:5001/api/super-admin/admins/${admin._id}/activity`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivity(res.data);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-3">📊 Activity Log for {admin.name}</h3>
      {loading ? (
        <p>Loading activity...</p>
      ) : (
        <ul className="list-disc pl-6">
          {activity.length > 0 ? (
            activity.map((log, index) => (
              <li key={index} className="text-gray-700">
                {log.action} - <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No activity found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminActivity;
