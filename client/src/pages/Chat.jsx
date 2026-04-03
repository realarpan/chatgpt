import React, { useState } from "react";
import API from "../api";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    // add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const res = await API.post("/chat", { message: input });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
      alert("Error getting response");
    }

    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded max-w-xl ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2 bg-white">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
