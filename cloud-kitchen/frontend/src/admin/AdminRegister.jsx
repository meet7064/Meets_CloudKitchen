import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Store, ArrowLeft, CheckCircle2 } from "lucide-react";

const AdminRegister = () => {
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
      setError("⚠️ Please complete all artisan details.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/admin/register", form);
      setSuccess("✨ Application received! Welcome to the collective.");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (error) {
      setError("❌ Registration failed. Perhaps this email is already in our directory?");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCF8] px-4">
      {/* ✅ Back to Public Market */}
      <Link 
        to="/" 
        className="mb-8 flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={16} /> Return to Marketplace
      </Link>

      <div className="bg-white p-10 shadow-xl rounded-3xl border border-stone-100 w-full max-w-md">
        {/* ✅ Boutique Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl mb-4 text-amber-700">
            <Store size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Join the Collective</h2>
          <p className="text-stone-500 mt-2 text-sm">Create your artisan profile and start sharing your crafts with the community.</p>
        </div>

        {/* 📌 Success Message */}
        {success && (
          <div className="bg-green-50 text-green-700 text-sm p-4 rounded-xl flex items-center gap-3 mb-6 border border-green-100">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {/* 📌 Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl text-center mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Shop Name / Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name or Shop Name"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Studio Password"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-amber-800 active:scale-95 transition-all"
          >
            Create My Studio
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">
            Already part of the community?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="text-amber-700 font-bold hover:underline"
            >
              Sign In Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;