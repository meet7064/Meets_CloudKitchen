import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, ArrowLeft, Leaf } from "lucide-react";

const UserRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("Please share your name, email, and a secure password.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/users/register", form);
      setSuccess("✨ Welcome to the Collective! Redirecting to login...");
      setTimeout(() => navigate("/user/login"), 2000);
    } catch (error) {
      setError("We couldn't complete your registration. Perhaps that email is already in use?");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] px-6">
      
      {/* 🌿 Back Navigation */}
      <Link 
        to="/user/login" 
        className="mb-8 flex items-center gap-2 text-stone-400 hover:text-emerald-800 transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
      >
        <ArrowLeft size={14} /> Back to Sign In
      </Link>

      <div className="bg-white p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] border border-stone-100 w-full max-w-md relative overflow-hidden">
        
        {/* Decorative Leaf Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-900 text-white rounded-2xl mb-6 shadow-xl shadow-emerald-900/20 -rotate-3">
            <Leaf size={24} />
          </div>
          <h2 className="text-3xl font-serif italic text-stone-900 mb-2">Join the Collective</h2>
          <p className="text-stone-400 text-sm font-medium">Start your journey with local artisans.</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl text-center animate-pulse">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-2xl text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-700/30 focus:ring-4 focus:ring-emerald-700/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-700/30 focus:ring-4 focus:ring-emerald-700/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-700 transition-colors" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Create a Password"
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-700/30 focus:ring-4 focus:ring-emerald-700/5 outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-bold shadow-xl shadow-stone-900/10 hover:bg-emerald-900 transition-all active:scale-[0.98] mt-4"
          >
            Create Your Account
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-stone-50 text-center">
          <p className="text-stone-400 text-xs font-medium">
            Already part of the community?{" "}
            <button
              onClick={() => navigate("/user/login")}
              className="text-emerald-800 font-bold hover:underline underline-offset-4"
            >
              Sign In Here
            </button>
          </p>
        </div>
      </div>

      <p className="mt-8 text-stone-300 text-[9px] uppercase tracking-[0.3em] font-bold">
        Community • Craft • Connection
      </p>
    </div>
  );
};

export default UserRegister;