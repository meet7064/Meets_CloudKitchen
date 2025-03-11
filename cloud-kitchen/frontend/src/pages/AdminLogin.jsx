import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
      </form>
      <button
          onClick={() => navigate("/admin/register")}
          className="bg-green-600 text-white px-4 py-2 mt-4"
        >
          Register as Admin
        </button>
    </div>
  );
};

export default AdminLogin;
