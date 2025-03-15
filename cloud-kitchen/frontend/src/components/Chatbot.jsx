import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "👋 Hi! Welcome to Cloud Kitchen. How can I assist you?", fromBot: true }]);
  const [input, setInput] = useState("");

  // ✅ Predefined Responses for User Queries
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("menu")) {
      return "📋 Our menu includes delicious pizzas, burgers, and pasta. 🍕🍔🍝 Check it out in the Menu section!";
    }
    if (lowerMessage.includes("order status")) {
      return "🛒 You can track your order in the 'Orders' section of your profile. Let me know if you need help!";
    }
    if (lowerMessage.includes("delivery time")) {
      return "🚚 Our average delivery time is **30-40 minutes**, but it may vary based on location.";
    }
    if (lowerMessage.includes("contact")) {
      return "📞 You can contact us at **support@cloudkitchen.com** or call us at **+1-234-567-890**.";
    }
    if (lowerMessage.includes("offers") || lowerMessage.includes("discount")) {
      return "🎉 We currently have a **10% discount** for first-time users! Use code **FIRST10** at checkout.";
    }
    return "🤖 I'm still learning! Please ask about our **menu, order status, delivery time, or offers**.";
  };

  // ✅ Handle Message Sending
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, fromBot: false };
    setMessages([...messages, userMessage]);
    setInput("");

    // ⏳ Simulated bot response after 1 second
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, fromBot: true }]);
    }, 1000);
  };

  return (
    <div className="p-4 w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-3">💬 Cloud Kitchen Chatbot</h2>

      {/* 🟢 Chat Window */}
      <div className="h-64 overflow-y-auto border p-3 mb-3 rounded-lg bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 my-1 w-fit max-w-[80%] rounded-lg ${msg.fromBot ? "bg-blue-100 text-left" : "bg-green-200 text-right ml-auto"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* 🟢 Input Field & Send Button */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-grow rounded-lg"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Send 🚀
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
