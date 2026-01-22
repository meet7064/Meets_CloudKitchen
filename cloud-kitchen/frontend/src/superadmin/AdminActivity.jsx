import React, { useState, useEffect } from "react";
import axios from "axios";
import { History, Activity, Clock, AlertCircle, CheckCircle2, Package, Tag } from "lucide-react";

const AdminActivity = ({ admin }) => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      fetchActivity();
    }
  }, [admin]);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("superadminToken");
      const res = await axios.get(
        `http://localhost:5001/api/super-admin/admins/${admin._id}/activity`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivity(res.data);
    } catch (error) {
      console.error("Error fetching artisan activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper to assign icons to specific artisan actions
  const getActionIcon = (action) => {
    const act = action.toLowerCase();
    if (act.includes("order")) return <Package className="text-emerald-500" size={16} />;
    if (act.includes("item") || act.includes("product")) return <Tag className="text-amber-500" size={16} />;
    if (act.includes("login")) return <History className="text-stone-400" size={16} />;
    if (act.includes("update")) return <CheckCircle2 className="text-blue-500" size={16} />;
    return <Activity className="text-stone-400" size={16} />;
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <History className="text-emerald-700" size={20} />
          Artisan Audit Trail: <span className="font-serif italic text-emerald-900">{admin.name}</span>
        </h3>
        <button 
           onClick={fetchActivity}
           className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-700 transition-colors"
        >
          Refresh Logs
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-10 space-y-3">
          <div className="w-8 h-8 border-4 border-stone-100 border-t-emerald-700 rounded-full animate-spin" />
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Accessing Records...</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical Line for Timeline */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-stone-100" />

          <div className="space-y-6">
            {activity.length > 0 ? (
              activity.map((log, index) => (
                <div key={index} className="relative pl-10 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-stone-300 group-hover:border-emerald-600 transition-colors z-10" />
                  
                  <div className="bg-white border border-stone-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <p className="text-sm font-bold text-stone-800">{log.action}</p>
                      </div>
                      <div className="flex items-center gap-1 text-stone-400 text-[10px] font-bold uppercase tracking-tight">
                        <Clock size={12} />
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium">
                      Recorded on {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-12 text-center">
                <AlertCircle className="text-stone-200 mb-2" size={32} />
                <p className="text-stone-400 text-sm italic">No merchant activity recorded in the last 30 days.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivity;