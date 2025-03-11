import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/admin/register", form);
      navigate("/admin/login");
    } catch (error) {
      alert("Error registering admin");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
