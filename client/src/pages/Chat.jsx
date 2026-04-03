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
  <div className="h-screen flex flex-col bg-[#343541] text-white">
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

    <div className="p-4 bg-[#40414f] flex gap-2">
      <input
        className="flex-1 p-3 rounded bg-[#343541] border border-gray-600"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 px-5 rounded"
      >
        Send
      </button>
    </div>
  </div>
);
}
