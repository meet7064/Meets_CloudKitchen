import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cloud Kitchen</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-yellow-400 transition">Menu</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-yellow-400 transition">Orders</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link>
          </li>
          <li>
            <Link to="/admin/login" className="text-white px-4">Admin Login</Link>
          </li>
          <li>
            <Link to="/user/login" className="text-white px-4">User Login</Link>
          </li>
          <li>
          <Link to="/admin/register" className="text-white px-4">Admin Register</Link>
          </li>
          <li>
          <Link to="/user/register" className="text-white px-4">User Register</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
