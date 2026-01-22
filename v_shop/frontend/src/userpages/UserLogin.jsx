import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, ArrowLeft, Sparkles } from "lucide-react";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please provide both your email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/users/login", form);
      localStorage.setItem("userToken", res.data.token);
      navigate("/");
    } catch (error) {
      setError("Credentials not recognized. Please try again or create an account.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] px-6">
      
      {/* 🌿 Back to Marketplace */}
      <Link 
        to="/" 
        className="mb-8 flex items-center gap-2 text-stone-400 hover:text-emerald-800 transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
      >
        <ArrowLeft size={14} /> Back to the Collective
      </Link>

      <div className="bg-white p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] border border-stone-100 w-full max-w-md relative overflow-hidden">
        
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-60" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-900 text-white rounded-2xl mb-6 shadow-xl shadow-emerald-900/20 rotate-3">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-serif italic text-stone-900 mb-2">Welcome Back</h2>
          <p className="text-stone-400 text-sm font-medium">Step back into your community marketplace.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-700/30 focus:ring-4 focus:ring-emerald-700/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-700/30 focus:ring-4 focus:ring-emerald-700/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-bold shadow-xl shadow-stone-900/10 hover:bg-emerald-900 transition-all active:scale-[0.98]"
          >
            Sign In to the Market
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-stone-50 text-center">
          <p className="text-stone-400 text-xs font-medium">
            New to the collective?{" "}
            <button
              onClick={() => navigate("/user/register")}
              className="text-emerald-800 font-bold hover:underline underline-offset-4"
            >
              Create an Account
            </button>
          </p>
        </div>
      </div>

      <p className="mt-8 text-stone-300 text-[9px] uppercase tracking-[0.3em] font-bold">
        Authentic • Local • Sustainable
      </p>
    </div>
  );
};

export default UserLogin;