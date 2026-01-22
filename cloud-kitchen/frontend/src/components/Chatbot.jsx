import { useState, useRef, useEffect } from "react";
import { Send, Leaf, HelpCircle } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "🌿 Greetings! Welcome to the Artisan Marketplace. I'm your digital shopkeeper. How can I help you today?", fromBot: true }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Local Marketplace Responses
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("menu") || lowerMessage.includes("goods") || lowerMessage.includes("shop")) {
      return "📋 Our market features handcrafted pottery, organic farm produce, and artisan bakery items. You can explore them all in the 'Shop Goods' section!";
    }
    if (lowerMessage.includes("status") || lowerMessage.includes("where")) {
      return "📦 You can track the progress of your handcrafted items in your 'Purchase History' under your profile.";
    }
    if (lowerMessage.includes("delivery") || lowerMessage.includes("shipping")) {
      return "🚚 Since our goods are prepared in small batches, delivery usually takes **2-3 business days** to ensure everything arrives fresh and safe.";
    }
    if (lowerMessage.includes("vendor") || lowerMessage.includes("sell")) {
      return "🤝 We are always looking for local creators! Please email **partners@artisanmarket.com** to apply for a vendor stall.";
    }
    if (lowerMessage.includes("discount") || lowerMessage.includes("coupon")) {
      return "🌻 Support local and save! Use code **VILLAGE5** for $5 off your first basket over $30.";
    }
    return "🎨 I'm here to help! Ask me about our **local goods, vendor partnerships, shipping times, or your recent finds.**";
  };

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;
    
    const userMessage = { text: textToSend, fromBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(textToSend);
      setMessages((prev) => [...prev, { text: botResponse, fromBot: true }]);
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-stone-200">
      {/* 🟢 Header */}
      <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-amber-600 p-1.5 rounded-full">
            <Leaf size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Market Assistant</h2>
            <p className="text-[10px] text-amber-200 uppercase tracking-widest">Always Online</p>
          </div>
        </div>
        <HelpCircle size={20} className="text-stone-400" />
      </div>

      {/* 🟢 Chat Window */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#FDFCF8]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.fromBot ? "justify-start" : "justify-end"}`}>
            <div className={`p-3 text-sm rounded-2xl shadow-sm max-w-[85%] leading-relaxed ${
              msg.fromBot 
                ? "bg-white border border-stone-100 text-stone-800 rounded-tl-none" 
                : "bg-amber-700 text-white rounded-tr-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 🟢 Suggestions Bar */}
      <div className="px-4 pb-2 bg-[#FDFCF8] flex gap-2 overflow-x-auto no-scrollbar">
        {["Shop Goods", "Order Status", "Shipping"].map((tag) => (
          <button 
            key={tag}
            onClick={() => handleSend(tag)}
            className="whitespace-nowrap bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] font-bold px-3 py-1 rounded-full border border-stone-200 transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 🟢 Input Area */}
      <div className="p-4 bg-white border-t border-stone-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-600/20 transition"
          placeholder="Ask about our artisans..."
        />
        <button 
          onClick={() => handleSend()} 
          className="p-2.5 bg-stone-900 text-white rounded-xl hover:bg-amber-800 transition shadow-md active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;