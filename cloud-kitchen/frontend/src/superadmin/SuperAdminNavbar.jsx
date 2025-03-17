import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const superAdminToken = localStorage.getItem("superadminToken");

  const handleLogout = () => {
    localStorage.removeItem("superadminToken");
    navigate("/super-admin/login");
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cloud Kitchen - Super Admin</h1>
        <ul className="flex space-x-6">
          <li><Link to="/super-admin/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>
          <li><Link to="/super-admin/create-admin" className="hover:text-yellow-400">Create Admin</Link></li>
          <li><Link to="/super-admin/admin-list" className="hover:text-yellow-400">Manage Admins</Link></li>
          {superAdminToken ? (
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">Logout</button>
          ) : (
            <Link to="/super-admin/login" className="hover:text-gray-400">Login</Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
