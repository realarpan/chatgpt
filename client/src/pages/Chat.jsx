import React, { useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await API.post("/chat", { message: input });
      const botMsg = { role: "bot", content: res.data.reply };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      alert("Error getting response");
    }

    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] p-4 hidden md:flex flex-col">
        <h2 className="text-xl font-bold mb-6">AI Chat</h2>

        <button className="bg-indigo-600 p-2 rounded-lg mb-4">
          + New Chat
        </button>

        <div className="text-gray-400 text-sm">
          No history yet
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b border-gray-700 text-lg font-semibold">
          Chat
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-xl p-4 rounded-xl ${
                msg.role === "user"
                  ? "bg-indigo-600 ml-auto"
                  : "bg-gray-800"
              }`}
            >
              {msg.content}
            </motion.div>
          ))}

        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-gray-700 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 p-3 rounded-lg bg-gray-800 outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            className="bg-indigo-600 px-5 rounded-lg"
          >
            Send
          </motion.button>
        </div>

      </div>
    </div>
  );
}
