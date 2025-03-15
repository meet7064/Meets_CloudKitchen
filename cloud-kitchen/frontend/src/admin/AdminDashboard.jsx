import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">🚀 Admin Dashboard</h1>

      {/* 📌 Admin Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* 📌 Manage Menu */}
        <Link to="/admin/menu" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
          <div className="flex items-center">
            <span className="bg-blue-500 text-white p-3 rounded-full text-xl">📋</span>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">Manage Menu</h2>
              <p className="text-gray-600">Edit, add, and remove menu items.</p>
            </div>
          </div>
        </Link>

        {/* 📌 View Orders */}
        <Link to="/admin/orders" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
          <div className="flex items-center">
            <span className="bg-green-500 text-white p-3 rounded-full text-xl">📦</span>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">View Orders</h2>
              <p className="text-gray-600">Track and manage customer orders.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
