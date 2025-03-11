import { useState } from "react";

const AdminMenu = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMenuItem = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken"); // Ensure the admin is logged in

    try {
      const response = await fetch("http://localhost:5001/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, price, image }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add menu item");
      }

      setMessage("Menu item added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Add Menu Item</h1>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleAddMenuItem} className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AdminMenu;
