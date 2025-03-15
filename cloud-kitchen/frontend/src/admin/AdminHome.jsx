import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SalesReport from "./SalesReport"; // ✅ Import the Sales Report component
import { Menu, X } from "lucide-react"; // Icons for better UI

const AdminHome = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="hover:text-yellow-400 transition">Cloud Kitchen</Link>
          </h1>

          {/* Mobile Menu Button */}
          <button className="sm:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex space-x-6">
            <Link to="/admin/login" className="text-blue-400 font-semibold hover:text-blue-500 transition">Login</Link>
            <Link to="/admin/register" className="text-green-400 font-semibold hover:text-green-500 transition">Register</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Welcome, Admin! 🎯
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Manage menu items, track orders, and optimize your kitchen operations.
          </p>

          <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <Link to="/admin/menu" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Manage Menu
            </Link>
            <Link to="/admin/orders" className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition">
              View Orders
            </Link>
          </div>
        </div>

        {/* ✅ Admin Illustration */}
        <img 
          src="https://source.unsplash.com/600x400/?restaurant,management" 
          alt="Admin Dashboard" 
          className="mt-8 md:mt-0 w-full max-w-md rounded-lg shadow-lg"
        />
      </header>

      {/* ✅ Dashboard Info Section */}
      <section className="bg-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Tools & Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">📋 Manage Menu</h3>
            <p className="text-gray-600 mt-2">Add, edit, and remove menu items easily.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">📦 Track Orders</h3>
            <p className="text-gray-600 mt-2">Monitor incoming orders and update statuses.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">📊 Sales Reports</h3>
            <p className="text-gray-600 mt-2">Get insights into sales performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
