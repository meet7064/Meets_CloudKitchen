import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Store, ShoppingBag, BarChart3, ArrowRight, UserCircle } from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8]">
      {/* ✅ Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-10 py-16 lg:py-24 bg-stone-50 border-b border-stone-100">
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest mb-6">
            <Store size={14} /> Vendor Central
          </div>
          <h1 className="text-5xl font-extrabold text-stone-900 leading-tight">
            Nurture Your <span className="text-amber-700">Artisan</span> Shop 🌿
          </h1>
          <p className="text-stone-600 text-lg mt-6 leading-relaxed">
            Welcome back to your creative workspace. From here, you can curate your collection, 
            fulfill community orders, and grow your local presence.
          </p>

          <div className="mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/admin/menu" className="px-8 py-4 bg-stone-900 text-white rounded-xl text-lg font-bold hover:bg-amber-800 transition-all shadow-lg flex items-center justify-center gap-2">
              Update Collection <ArrowRight size={20} />
            </Link>
            <Link to="/admin/orders" className="px-8 py-4 border-2 border-stone-900 text-stone-900 rounded-xl text-lg font-bold hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2">
              <ShoppingBag size={20} /> Active Orders
            </Link>
          </div>
        </div>

        {/* ✅ Artisan Illustration */}
        <div className="relative mt-12 md:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=600&q=80" 
            alt="Handcrafted pottery workshop" 
            className="w-full max-w-md rounded-3xl shadow-2xl border-8 border-white transform rotate-2"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-100">
             <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                <BarChart3 size={20} />
             </div>
             <div>
                <p className="text-xs text-stone-500 font-bold uppercase">Today's Impact</p>
                <p className="text-lg font-bold text-stone-900">+12 Orders</p>
             </div>
          </div>
        </div>
      </header>

      {/* ✅ Studio Tools Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Your Studio Toolbox</h2>
          <p className="text-stone-500 mb-12 max-w-lg mx-auto">Everything you need to manage your small business and connect with your neighbors.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Tool 1 */}
            <div className="group bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-300">
              <div className="w-12 h-12 bg-stone-50 text-stone-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <Store size={24} />
              </div>
              <h3 className="text-xl font-bold text-stone-800">Curation Engine</h3>
              <p className="text-stone-500 mt-3 leading-relaxed">Update your shop's inventory, change seasonal pricing, and showcase new arrivals.</p>
              <Link to="/admin/menu" className="mt-6 inline-flex items-center text-amber-800 font-bold text-sm gap-1 hover:gap-2 transition-all">
                Manage Inventory <ArrowRight size={14} />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="group bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-300">
              <div className="w-12 h-12 bg-stone-50 text-stone-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-xl font-bold text-stone-800">Fulfillment Center</h3>
              <p className="text-stone-500 mt-3 leading-relaxed">Track open orders, manage delivery local pickups, and keep your customers informed.</p>
              <Link to="/admin/orders" className="mt-6 inline-flex items-center text-amber-800 font-bold text-sm gap-1 hover:gap-2 transition-all">
                Review Orders <ArrowRight size={14} />
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="group bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-300">
              <div className="w-12 h-12 bg-stone-50 text-stone-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-stone-800">Growth Insights</h3>
              <p className="text-stone-500 mt-3 leading-relaxed">View which handcrafted pieces are trending and track your monthly community support.</p>
              <Link to="/admin/sales-report" className="mt-6 inline-flex items-center text-amber-800 font-bold text-sm gap-1 hover:gap-2 transition-all">
                View Reports <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Quick Stats/Logout Footer */}
      <footer className="mt-auto bg-stone-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center overflow-hidden">
               <UserCircle className="text-stone-400" size={32} />
            </div>
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">Active Vendor Session</p>
              <p className="text-white font-bold">Admin Portal</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="px-6 py-2 bg-red-900/30 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900 hover:text-white transition-all font-bold text-sm"
          >
            End Session
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AdminHome;