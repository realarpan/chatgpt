import React, { useState } from "react";
import API from "../api";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const res = await API.post("/chat", { message: input });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply || "No response" },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Error getting response" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#343541] text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#202123] p-4 hidden md:flex flex-col">
        <h2 className="text-lg font-bold mb-4">AI Chat</h2>
        <button className="bg-green-600 p-2 rounded">+ New Chat</button>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-2xl ${
                msg.role === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-[#444654]"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#40414f] flex gap-2">
          <input
            className="flex-1 p-3 rounded bg-[#343541] border border-gray-600 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 px-6 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
