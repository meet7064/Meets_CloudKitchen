import { useEffect, useState } from "react";
import axios from "axios";

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
        setError("❌ Failed to fetch menu items.");
      }
    };
    fetchMenu();
  }, []);

  // 🛒 Add item to cart
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

  // 🔄 Remove item from cart
  const removeFromCart = (menuItem) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.menuItem === menuItem._id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Place Order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("🔑 Please log in first.");
        return;
      }

      await axios.post(
        "http://localhost:5001/api/orders",
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order placed successfully!");
      setCart([]); // Clear cart after order
    } catch (error) {
      alert("❌ Failed to place order.");
    }
  };

  return (
    <div className="p-8 flex flex-col lg:flex-row gap-8">
      {/* ✅ Menu Section */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6">🍽️ Menu</h1>
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.length === 0 && !error ? (
            <p>No menu items found.</p>
          ) : (
            menuItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Cart Sidebar */}
      {cart.length > 0 && (
        <div className="w-full lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">🛍️ Your Cart</h2>
          {cart.map((item, index) => {
            const menuItem = menuItems.find((menu) => menu._id === item.menuItem);
            return (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <span>{menuItem?.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(menuItem)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-all"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(menuItem)}
                    className="bg-green-500 text-white px-2 rounded hover:bg-green-600 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={placeOrder}
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
          >
            ✅ Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
