import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/user/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-yellow-400 transition">Cloud Kitchen</Link>
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
          <li><Link to="/menu" className="hover:text-yellow-400 transition">Menu</Link></li>
          <li><Link to="/orders" className="hover:text-yellow-400 transition">Orders</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link></li>
          {userToken ? (
            <button 
              onClick={handleLogout} 
              className="text-red-600 font-semibold hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/user/login" 
              className=""
            >
              Login
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="sm:hidden text-white focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul className="sm:hidden bg-gray-800 p-4 space-y-3 text-center">
          <li><Link to="/" className="block py-2 hover:text-yellow-400">Home</Link></li>
          <li><Link to="/menu" className="block py-2 hover:text-yellow-400">Menu</Link></li>
          <li><Link to="/orders" className="block py-2 hover:text-yellow-400">Orders</Link></li>
          <li><Link to="/profile" className="block py-2 hover:text-yellow-400">Profile</Link></li>
          {userToken ? (
            <button 
              onClick={handleLogout} 
              className="text-red-600 font-semibold hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/user/login" 
              className="hover:text-gray-400"
            >
              Login
            </Link>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
