import { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await fetch("http://localhost:5001/api/menu", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
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

  // ✅ Place Order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      await axios.post(
        "http://localhost:5001/api/orders",
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      setCart([]); // Clear cart after order
    } catch (error) {
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
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
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* 🛍️ Cart Section */}
      {cart.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          {cart.map((item, index) => {
            const menuItem = menuItems.find((menu) => menu._id === item.menuItem);
            return (
              <p key={index}>
                {menuItem?.name} - Quantity: {item.quantity}
              </p>
            );
          })}
          <button
            onClick={placeOrder}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
