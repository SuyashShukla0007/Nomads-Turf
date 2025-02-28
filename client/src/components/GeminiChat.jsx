import React, { useState, useEffect, useRef } from "react";
import {FaPaperPlane,FaRobot,FaCircleNotch,FaBars,FaArrowLeft,FaPlus,FaSun,FaMoon,
} from "react-icons/fa";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTimeStamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Ensure the user message has sender and timestamp
    const userMessage = {
      text: input,
      sender: "user",
      timestamp: getTimeStamp(),
    };
    
    // Display the user's message immediately
    setMessages((prev) => [...prev, userMessage]);
    
    setInput(""); // Clear input after sending
    setIsTyping(true);
  
    try {
      const response = await fetch("http://localhost:3000/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
  
      if (!response.ok) throw new Error("Failed to fetch response");
  
      const data = await response.json();
  
      const botResponse = {
        text: data.response || "Error: No response received",
        sender: "bot",
        timestamp: getTimeStamp(),
      };
  
      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error("Error", err);
      setMessages((prev) => [
        ...prev,
        { text: "Failed to get response", sender: "bot", timestamp: getTimeStamp() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
//gotta handle actual api call
  // const handleSend = async () => {
  //   if (!input.trim()) return;
  //   const userMessage = {
  //     input: input
  //   };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //   setIsTyping(true);

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/gemini/generate",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ input: userMessage }),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed");
  //     console.log(response)
  //     const data = await response.json();
  //     console.log(data);
  //     const botText =
  //       data.response ||
  //       "error";

  //     const botResponse = {
  //       text: botText,
  //       sender: "bot",
  //       timestamp: getTimeStamp(),
  //     };

  //     setMessages((prev) => [...prev, botResponse]);
  //   } catch (err) {
  //     console.error("Error", err);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         text: "Failed",
  //         sender: "bot",
  //         timestamp: getTimeStamp(),
  //       },
  //     ]);
  //   } finally {
  //     setIsTyping(false);
  //   }
  // };

  const startNewChat = () => setMessages([]);

  const goBack = () => window.history.back();

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <aside
        className={`transition-transform transform ${
          sidebarOpen ? "w-72" : "w-20"
        } p-4 shadow-lg sticky top-0 h-screen ${
          darkMode ? "bg-gray-800" : "bg-blue-500"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 mb-6 rounded-lg hover:bg-blue-400"
        >
          <FaBars className="text-2xl" />
        </button>

        <button
          onClick={goBack}
          className="flex items-center p-3 rounded-lg hover:bg-blue-400"
        >
          <FaArrowLeft className="text-xl" />
          {sidebarOpen && <span className="ml-4">Go Back</span>}
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center p-3 rounded-lg hover:bg-blue-400"
        >
          {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          {sidebarOpen && (
            <span className="ml-4">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          )}
        </button>

        <button
          onClick={startNewChat}
          className="flex items-center p-3 rounded-lg hover:bg-blue-400"
        >
          <FaPlus className="text-xl" />
          {sidebarOpen && <span className="ml-4">New Chat</span>}
        </button>
      </aside>

      <div className="flex-1 flex flex-col items-center p-6">
        <header className="w-full max-w-5xl p-6 flex justify-between shadow-md mt-6 rounded-lg">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
            Chat with AI
          </h1>
        </header>

        <div
          className="chat-body w-full max-w-5xl flex-grow overflow-y-auto p-6 space-y-4 rounded-lg shadow-lg"
          style={{ minHeight: "70vh" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <FaRobot className="text-3xl text-cyan-500 mr-3 animate-bounce" />
              )}
              <div
                className={`px-4 py-3 rounded-xl shadow-md max-w-3xl ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-300 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 block mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 animate-fadeIn">
              <FaRobot className="text-2xl text-blue-400" />
              <FaCircleNotch className="animate-spin text-blue-300" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input w-full max-w-5xl p-4 flex items-center rounded-lg shadow-lg sticky bottom-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything..."
            className="flex-grow p-3 rounded-full text-lg bg-gray-800 text-white focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-4 p-3 rounded-full bg-blue-500 hover:bg-blue-600"
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
