import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react"; // Added commerce-friendly icons

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/user/login");
  };

  return (
    <nav className="bg-stone-50 border-b border-stone-200 text-stone-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* ✅ Brand Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight">
          <Link to="/" className="flex items-center gap-2 hover:text-amber-700 transition">
            <span className="text-amber-600 text-3xl">🌿</span>
            Artisan Market
          </Link>
        </h1>

        {/* ✅ Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li>
            <Link to="/" className="hover:text-amber-700 transition">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-amber-700 transition">Shop Goods</Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center gap-1 hover:text-amber-700 transition">
              <ShoppingBag size={18} /> My Orders
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-1 hover:text-amber-700 transition">
              <User size={18} /> Profile
            </Link>
          </li>
          
          <div className="h-6 w-[1px] bg-stone-300 mx-2"></div>

          {userToken ? (
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-stone-800 text-white rounded-full text-sm hover:bg-stone-900 transition shadow-sm"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/user/login" 
              className="px-5 py-2 border-2 border-stone-800 rounded-full text-sm font-bold hover:bg-stone-800 hover:text-white transition"
            >
              Sign In
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-stone-800 focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col p-6 space-y-4 font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-lg">Home</Link></li>
            <li><Link to="/menu" onClick={() => setMenuOpen(false)} className="block py-2 text-lg">Shop Goods</Link></li>
            <li><Link to="/orders" onClick={() => setMenuOpen(false)} className="block py-2 text-lg">My Orders</Link></li>
            <li><Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2 text-lg">Profile</Link></li>
            <hr className="border-stone-200" />
            {userToken ? (
              <button 
                onClick={handleLogout} 
                className="w-full text-center py-3 bg-red-50 text-red-600 font-bold rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/user/login" 
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 bg-amber-700 text-white font-bold rounded-lg shadow-md"
              >
                Sign In
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;