import React, { useState } from "react";
import axios from "axios";

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/super-admin/create-admin", { name, email, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("superadminToken")}` }
      });
      alert("Admin created successfully!");
    } catch (err) {
      alert("Failed to create admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Admin</h2>
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
