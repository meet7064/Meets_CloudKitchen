import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hi! How can I help?", fromBot: true }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, fromBot: false }]);
    setInput("");

    // Simulated bot response (replace with API call if needed)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm still learning!", fromBot: true }]);
    }, 1000);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Chatbot</h2>
      <div className="h-64 overflow-y-auto border p-3 my-3">
        {messages.map((msg, idx) => (
          <p key={idx} className={`p-2 rounded ${msg.fromBot ? "bg-gray-200" : "bg-green-200 text-right"}`}>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full"
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="mt-2 p-2 bg-blue-500 text-white rounded">Send</button>
    </div>
  );
};

export default Chatbot;
