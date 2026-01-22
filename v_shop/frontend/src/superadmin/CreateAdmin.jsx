import React, { useState } from "react";
import axios from "axios";
import { UserPlus, Store, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5001/api/super-admin/create-admin",
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` }
        }
      );
      alert("✨ Vendor account established successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("❌ Failed to create vendor account. Please verify details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF8] px-4">
      {/* ✅ Back to Dashboard Link */}
      <Link 
        to="/super-admin/dashboard" 
        className="mb-6 flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={16} /> Back to Oversight
      </Link>

      <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 max-w-md w-full">
        {/* ✅ Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl mb-4">
            <UserPlus className="text-amber-700" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Onboard Vendor</h2>
          <p className="text-stone-500 mt-2 text-sm">Create a new partner account to manage their shop and goods.</p>
        </div>

        <form onSubmit={handleCreateAdmin} className="space-y-5">
          {/* ✅ Vendor Name */}
          <div className="relative">
            <Store className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Vendor Shop Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-stone-400"
              required
            />
          </div>

          {/* ✅ Vendor Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="email"
              placeholder="Professional Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-stone-400"
              required
            />
          </div>

          {/* ✅ Initial Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="password"
              placeholder="Secure Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-stone-400"
              required
            />
          </div>

          {/* ✅ Action Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-stone-900 text-white p-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-amber-800 active:scale-95"
            }`}
          >
            {loading ? "Establishing Account..." : "Confirm Vendor Partner"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-stone-400 italic">
          New vendors will receive an email to finalize their shop profile once created.
        </p>
      </div>
    </div>
  );
};

export default CreateAdmin;