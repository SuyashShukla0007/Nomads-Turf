import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tileset from "../assets/tileset.png";

const ChatRoom = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = {
      id: Date.now(),
      user: "You",
      text: newMessage,
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start p-8"
      style={{
        background: `linear-gradient(rgba(196, 214, 229, 0.7), rgba(173, 216, 230, 0.7)), url(${tileset})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        className="text-4xl font-extrabold mb-4 tracking-wide"
        style={{
          fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
          color: "#007BAC",
        }}
      >
        Chat Room 💬
      </h1>

      <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
        <div
          className="h-96 overflow-y-auto p-4 rounded-lg space-y-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100"
          style={{ border: "4px solid #007BAC" }}
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 italic text-center">
             No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg ${
                  msg.user === "You"
                    ? "bg-blue-300 ml-auto"
                    : "bg-gray-300 mr-auto"
                } w-fit max-w-xs shadow-lg transition-transform hover:scale-105`}
              >
                <p className="text-sm">
                  <span className="font-semibold text-blue-700">
                    {msg.user}:
                  </span>{" "}
                  {msg.text}
                </p>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg border-2 border-blue-400 text-gray-800 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition-transform transform hover:scale-110"
          >
            Send
          </button>
        </div>
      </div>

      <button
        onClick={() => navigate("/home")}
        className="fixed bottom-6 text-white px-6 py-3 mt-8 rounded-full transition-transform transform hover:scale-110 shadow-xl"
        style={{
          background: "linear-gradient(90deg, #4A90E2, #007BAC)",
          fontWeight: "bold",
        }}
      >
        Exit Chat Room
      </button>
    </div>
  );
};

export default ChatRoom;
