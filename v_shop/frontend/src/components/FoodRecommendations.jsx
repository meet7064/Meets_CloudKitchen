import { useEffect, useState } from "react";

const FoodRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recommendations")
      .then((res) => res.json())
      .then((data) => setRecommendations(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((item, index) => (
            <li key={index} className="p-2 border-b">{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
};

export default FoodRecommendations;
