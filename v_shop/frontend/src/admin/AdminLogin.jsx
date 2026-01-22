import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Lock, Mail, ArrowLeft, Store } from "lucide-react";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/home");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError("We couldn't verify your artisan credentials. Please try again.");
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl mb-4">
            <Store className="text-amber-700" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Vendor Access</h2>
          <p className="text-stone-500 mt-2 text-sm">Enter your studio credentials to manage your shop.</p>
        </div>

        {/* ✅ Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Artisan Email"
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              required
            />
          </div>

          {/* Password Input */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-amber-800 active:scale-95 transition-all"
          >
            Enter Studio
          </button>
        </form>

        {/* Registration Prompt */}
        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">
            Interested in joining our community?{" "}
            <button
              onClick={() => navigate("/admin/register")}
              className="text-amber-700 font-bold hover:underline"
            >
              Apply as a Vendor
            </button>
          </p>
        </div>
      </div>
      
      {/* Aesthetic Footer Note */}
      <p className="mt-8 text-stone-400 text-xs text-center max-w-xs">
        Supporting local crafts and small-batch production since 2024.
      </p>
    </div>
  );
};

export default AdminLogin;