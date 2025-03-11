import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/users/login", form);
      localStorage.setItem("userToken", res.data.token);
      navigate("/user/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="block w-full mb-3 p-2 border"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
