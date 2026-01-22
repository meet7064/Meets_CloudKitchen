import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBasket, Trash2, Plus, Minus, Store } from "lucide-react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/menu");
        setMenuItems(response.data);
      } catch (err) {
        setError("❌ Could not connect to the artisan marketplace.");
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (menuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menuItem === menuItem._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.menuItem === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { menuItem: menuItem._id, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (menuItem) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.menuItem === menuItem._id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("🔒 Please sign in to support our local vendors.");
        return;
      }
      await axios.post(
        "http://localhost:5001/api/orders",
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("🌿 Thank you! Your request has been sent to the artisans.");
      setCart([]);
    } catch (error) {
      alert("❌ Something went wrong with your order.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-6 lg:p-12 flex flex-col lg:flex-row gap-10">
      {/* ✅ Marketplace Section */}
      <div className="flex-1">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-stone-900 flex items-center gap-3">
            <Store className="text-amber-700" size={36} />
            The Marketplace
          </h1>
          <p className="text-stone-500 mt-2">Discover handcrafted treasures and fresh local produce.</p>
        </header>

        {error && <p className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {menuItems.length === 0 && !error ? (
            <p className="text-stone-400 italic">Our artisans are currently preparing new goods...</p>
          ) : (
            menuItems.map((item) => (
              <div key={item._id} className="bg-white group rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                    In Stock
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-stone-800">{item.name}</h2>
                  <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-stone-900">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-stone-800 text-white p-2 rounded-lg hover:bg-amber-800 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Shopping Basket Sidebar */}
      <aside className="w-full lg:w-80 h-fit sticky top-24">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xl">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <ShoppingBasket className="text-amber-700" /> Your Basket
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-stone-400 text-sm">Your basket is empty.</p>
              <p className="text-stone-400 text-xs mt-1">Select items to support local creators!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item, index) => {
                  const menuItem = menuItems.find((menu) => menu._id === item.menuItem);
                  return (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-stone-50">
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">{menuItem?.name}</p>
                        <p className="text-xs text-amber-700">${menuItem?.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center bg-stone-100 rounded-lg p-1 gap-3">
                        <button onClick={() => removeFromCart(menuItem)} className="text-stone-500 hover:text-red-600">
                          {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => addToCart(menuItem)} className="text-stone-500 hover:text-amber-700">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-500">Total Support</span>
                  <span className="text-xl font-bold text-stone-900">
                    ${cart.reduce((acc, item) => {
                      const mi = menuItems.find((m) => m._id === item.menuItem);
                      return acc + (mi?.price || 0) * item.quantity;
                    }, 0).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-amber-800 transition-all shadow-lg active:scale-95"
                >
                  Checkout Basket
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Menu;