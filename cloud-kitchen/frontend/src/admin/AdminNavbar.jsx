import { Link, useNavigate } from "react-router-dom";
import { Store, ShoppingBag, BarChart3, LogOut, LayoutGrid } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-stone-900 text-stone-100 py-4 px-8 shadow-xl border-b border-stone-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* ✅ Boutique Branding */}
        <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <Store className="text-amber-500" size={24} />
          <span className="hidden sm:inline">Artisan Studio</span>
          <span className="sm:hidden">Studio</span>
        </h1>

        {/* ✅ Studio Navigation */}
        <ul className="flex items-center space-x-6 md:space-x-10 font-medium text-sm">
          <li>
            <Link to="/admin/home" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <LayoutGrid size={18} className="text-stone-400" />
              <span className="hidden md:inline">Studio Home</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/menu" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Store size={18} className="text-stone-400" />
              <span className="hidden md:inline">Collection</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <ShoppingBag size={18} className="text-stone-400" />
              <span className="hidden md:inline">Market Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/sales-report" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <BarChart3 size={18} className="text-stone-400" />
              <span className="hidden md:inline">Insights</span>
            </Link>
          </li>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-stone-700 mx-2 hidden sm:block"></div>

          {adminToken ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-stone-400 hover:text-red-400 font-bold transition-all text-xs uppercase tracking-widest"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Close Studio</span>
            </button>
          ) : (
            <Link 
              to="/admin/login" 
              className="text-amber-500 font-bold hover:text-amber-400"
            >
              Sign In
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;