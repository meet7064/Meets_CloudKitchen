import { useState } from "react";
import { Link } from "react-router-dom";
import { Store, MapPin, ArrowUpRight, Search, MessageSquare, X } from "lucide-react";
import Chatbot from "../components/Chatbot";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1A1A1A]">
      
      {/* 🏛️ The Grand Marketplace Hero */}
      <header className="relative pt-20 pb-32 px-6 border-b border-stone-200 overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              <span className="text-emerald-700">Online Now</span>
              <span className="w-1 h-1 bg-stone-300 rounded-full" />
              <span>42 Local Workshops</span>
              <span className="w-1 h-1 bg-stone-300 rounded-full" />
              <span>Free Community Pickup</span>
            </nav>
            
            <h1 className="text-7xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10">
              A collective of <br />
              <span className="font-serif italic text-emerald-900">local creators.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Link to="/menu" className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full text-lg font-medium hover:bg-emerald-900 transition-all flex items-center gap-3">
                Shop the Collective <ArrowUpRight size={20} />
              </Link>
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-700 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search for a vendor or craft..." 
                  className="w-full bg-white border border-stone-200 py-5 pl-12 pr-6 rounded-full text-sm outline-none focus:border-emerald-700 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-[-5%] opacity-20 hidden lg:block">
          <Store size={400} strokeWidth={0.5} />
        </div>
      </header>

      {/* 🏪 Featured Vendors (The Carousel/Grid) */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-light mb-2 text-stone-900">Featured <span className="font-serif italic">Artisans</span></h2>
              <p className="text-stone-500">The hands behind the craft this week.</p>
            </div>
            <Link to="/vendors" className="text-sm font-bold uppercase tracking-widest border-b-2 border-emerald-700 pb-1 hover:text-emerald-700 transition-colors">
              View Directory
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Clay & Co.", type: "Ceramics", location: "Downtown", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400" },
              { name: "Green Leaf Farm", type: "Produce", location: "West Side", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400" },
              { name: "Sourdough Lab", type: "Bakery", location: "Old Town", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
              { name: "Urban Bloom", type: "Florist", location: "Market Dist.", img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400" },
            ].map((vendor, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-stone-100">
                  <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                    {vendor.type}
                  </div>
                </div>
                <h3 className="text-xl font-serif italic group-hover:text-emerald-800 transition-colors">{vendor.name}</h3>
                <p className="text-stone-400 text-xs flex items-center gap-1 mt-1 uppercase tracking-widest">
                  <MapPin size={12} /> {vendor.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📦 Why the Collective? (Modern Info Blocks) */}
      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-5xl font-light leading-tight mb-6">Built for the <br /><span className="font-serif italic text-emerald-400">community.</span></h2>
              <p className="text-stone-400 leading-relaxed">We connect multiple local vendors into one seamless shopping experience, keeping the artisan spirit alive in the digital world.</p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Store size={24} />
                </div>
                <h4 className="text-xl font-serif italic">Centralized Checkout</h4>
                <p className="text-stone-500 text-sm">Shop from five different vendors and checkout once. We handle the coordination behind the scenes.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <MapPin size={24} />
                </div>
                <h4 className="text-xl font-serif italic">Local Pickup Hubs</h4>
                <p className="text-stone-500 text-sm">Pick up your entire order from a single community hub or have it delivered in one eco-friendly package.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 Sleek Chat UI */}
      <div className="fixed bottom-8 right-8 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 bg-emerald-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <MessageSquare size={24} />
          </button>
        ) : (
          <div className="w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden flex flex-col">
            <div className="p-6 bg-[#1A1A1A] text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest">Market Concierge</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:opacity-60"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;