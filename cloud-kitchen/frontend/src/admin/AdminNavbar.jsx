import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cloud Kitchen - Admin</h1>
        <ul className="flex space-x-6">
          <li><Link to="/admin/home" className="hover:text-yellow-400">Dashboard</Link></li>
          <li><Link to="/admin/menu" className="hover:text-yellow-400">Manage Menu</Link></li>
          <li><Link to="/admin/orders" className="hover:text-yellow-400">Manage Orders</Link></li>
          <li><Link to="/admin/sales-report" className="hover:text-yellow-400">Sales Report</Link></li>
          {adminToken ? (
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">Logout</button>
          ) : (
            <Link to="/admin/login" className="hover:text-gray-400">Login</Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
