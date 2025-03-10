import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Cloud Kitchen</h1>
      <p className="text-gray-700 text-lg">Order fresh food online with one click!</p>
      <Link to="/menu" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        View Menu
      </Link>
    </div>
  );
};

export default Home;
