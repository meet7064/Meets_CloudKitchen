import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", fromBot: true }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    setMessages([...messages, { text: input, fromBot: false }]);

    fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([...messages, { text: input, fromBot: false }, { text: data.response, fromBot: true }]);
      });

    setInput("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Food Chatbot</h1>
      <div className="bg-white p-4 rounded shadow">
        {messages.map((msg, index) => (
          <p key={index} className={msg.fromBot ? "text-blue-600" : "text-gray-700"}>
            {msg.text}
          </p>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border p-2 w-full mt-2" />
      <button onClick={handleSend} className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Send</button>
    </div>
  );
};

export default Chatbot;
