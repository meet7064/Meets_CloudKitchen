import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowLeft, ChevronRight } from "lucide-react";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/super-admin/login", { email, password });
      localStorage.setItem("superadminToken", res.data.token);
      navigate("/super-admin/dashboard");
    } catch (err) {
      alert("Verification failed. Please check administrative credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F0F0F] px-6">
      
      {/* 🏛️ System Back Link */}
      <Link 
        to="/" 
        className="mb-8 flex items-center gap-2 text-stone-500 hover:text-emerald-400 transition-colors font-bold text-[10px] uppercase tracking-[0.3em]"
      >
        <ArrowLeft size={14} /> Exit to Public Market
      </Link>

      <div className="bg-[#1A1A1A] p-10 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-[3rem] border border-stone-800 w-full max-w-md relative overflow-hidden">
        
        {/* Abstract Security Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-900/20 rounded-full blur-[80px]" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl mb-6 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-serif italic text-white mb-2">Marketplace Oversight</h2>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">System Authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="email"
              placeholder="Admin Identifier"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-[#242424] border border-stone-800 rounded-2xl text-stone-200 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="password"
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-[#242424] border border-stone-800 rounded-2xl text-stone-200 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-emerald-900/20 hover:bg-emerald-500 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            {loading ? "Verifying..." : "Authorize Access"}
            {!loading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-stone-600 text-[10px] font-bold uppercase tracking-widest">
            Protected Environment
          </p>
        </div>
      </div>

      {/* Security Note */}
      <div className="mt-8 flex items-center gap-2 text-stone-700">
        <div className="w-1.5 h-1.5 bg-emerald-900 rounded-full animate-pulse" />
        <p className="text-[9px] uppercase tracking-[0.4em] font-black">
          Encrypted Central Management
        </p>
      </div>
    </div>
  );
};

export default SuperAdminLogin;