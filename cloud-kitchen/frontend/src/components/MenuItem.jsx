const MenuItem = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-2" />
      <h2 className="text-xl font-semibold">{item.name}</h2>
      <p className="text-gray-700">${item.price}</p>
      <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Add to Cart</button>
    </div>
  );
};

export default MenuItem;
