import { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
