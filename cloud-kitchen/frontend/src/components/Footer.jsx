import { Link } from "react-router-dom";
import { Store, Instagram, Facebook, Twitter, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-stone-300 pt-20 pb-10 px-6 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 🏛️ Collective Branding */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif italic text-white flex items-center gap-2">
              <Store className="text-emerald-500" size={24} />
              The Collective
            </h2>
            <p className="text-sm leading-relaxed text-stone-400">
              A curated marketplace uniting local artisans, farmers, and creators. 
              Together, we build a more sustainable and soul-filled community.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-emerald-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* 🛍️ Shopping Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Marketplace</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/menu" className="hover:text-emerald-400 transition-colors">Shop All Goods</Link></li>
              <li><Link to="/vendors" className="hover:text-emerald-400 transition-colors">Artisan Directory</Link></li>
              <li><Link to="/orders" className="hover:text-emerald-400 transition-colors">Pickup Locations</Link></li>
              <li><Link to="/gift-cards" className="hover:text-emerald-400 transition-colors">Market Credits</Link></li>
            </ul>
          </div>

          {/* 🤝 Artisan Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">For Creators</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/admin/register" className="hover:text-emerald-400 transition-colors">Apply as a Vendor</Link></li>
              <li><Link to="/admin/login" className="hover:text-emerald-400 transition-colors">Vendor Studio</Link></li>
              <li><Link to="/guidelines" className="hover:text-emerald-400 transition-colors">Craft Guidelines</Link></li>
              <li><Link to="/community" className="hover:text-emerald-400 transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* 📍 Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Connect</h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={18} className="text-emerald-500 shrink-0" />
              <span>123 Market Square, <br />Old Town District</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={18} className="text-emerald-500 shrink-0" />
              <span>hello@localcollective.com</span>
            </div>
          </div>

        </div>

        {/* 📜 Fine Print */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
            &copy; {new Date().getFullYear()} Artisan Collective. Built with intent.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;