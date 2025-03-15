import { useState } from "react";
import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Hero Section */}
      <header className="relative flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Order Fresh <span className="text-red-500">Food</span> 🍔🚀
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Fast, fresh, and delivered to your doorstep in minutes!
          </p>

          {/* ✅ Call-to-Action Buttons */}
          <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <Link to="/menu" className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-all shadow-md">
              Order Now
            </Link>
            <Link to="/orders" className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg text-lg font-semibold hover:bg-red-600 hover:text-white transition-all shadow-md">
              View Orders
            </Link>
          </div>
        </div>

        {/* ✅ Hero Image */}
        <img
          src="https://source.unsplash.com/600x400/?food,restaurant"
          alt="Food Delivery"
          className="mt-8 md:mt-0 w-full max-w-md rounded-lg shadow-xl"
        />
      </header>

      {/* ✅ Popular Categories */}
      <section className="bg-white py-16 px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">🔥 Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "🍔 Burgers", desc: "Juicy and delicious burgers, made fresh." },
            { title: "🍕 Pizzas", desc: "Cheesy and flavorful pizzas for every taste." },
            { title: "🥗 Healthy Salads", desc: "Fresh and organic ingredients, guilt-free meals." },
          ].map((category, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md transition transform hover:-translate-y-2">
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <p className="text-gray-600 mt-2">{category.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ How It Works Section */}
      <section className="py-16 px-8 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">📦 How It Works?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "🛒 Browse Menu", desc: "Select your favorite meals from our menu." },
            { title: "💳 Place Your Order", desc: "Secure checkout and seamless payment options." },
            { title: "🚀 Get It Delivered", desc: "Freshly prepared food delivered fast." },
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105">
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            💬 Chat
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full shadow-md"
            >
              ❌
            </button>
            <Chatbot />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
