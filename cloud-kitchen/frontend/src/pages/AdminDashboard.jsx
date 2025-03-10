import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <Link to="/admin/menu" className="block p-3 bg-blue-500 text-white rounded mb-2">Manage Menu</Link>
        <Link to="/admin/orders" className="block p-3 bg-green-500 text-white rounded">View Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
