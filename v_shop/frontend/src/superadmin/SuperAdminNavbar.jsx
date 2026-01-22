import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, UserPlus, Users, LayoutDashboard, LogOut } from "lucide-react";

const SuperAdminNavbar = () => {
  const navigate = useNavigate();
  const superAdminToken = localStorage.getItem("superadminToken");

  const handleLogout = () => {
    localStorage.removeItem("superadminToken");
    navigate("/super-admin/login");
  };

  return (
    <nav className="bg-stone-950 text-stone-100 py-4 px-8 shadow-2xl border-b border-stone-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* ✅ Marketplace Branding */}
        <h1 className="text-xl font-extrabold tracking-tighter flex items-center gap-2">
          <ShieldCheck className="text-amber-500" size={24} />
          <span className="hidden sm:inline">Marketplace Oversight</span>
          <span className="sm:hidden">Admin</span>
        </h1>

        {/* ✅ Desktop Navigation */}
        <ul className="flex items-center space-x-8 font-medium text-sm">
          <li>
            <Link to="/super-admin/dashboard" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Overview</span>
            </Link>
          </li>
          <li>
            <Link to="/super-admin/create-admin" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <UserPlus size={18} />
              <span className="hidden md:inline">Onboard Vendor</span>
            </Link>
          </li>
          <li>
            <Link to="/super-admin/admin-list" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Users size={18} />
              <span className="hidden md:inline">Vendor Directory</span>
            </Link>
          </li>

          <div className="h-6 w-[1px] bg-stone-700 mx-2"></div>

          {superAdminToken ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 bg-stone-100 text-stone-950 px-4 py-1.5 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all text-xs"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link 
              to="/super-admin/login" 
              className="text-stone-400 hover:text-white transition-colors"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;