import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Nomad's Turf</h1>
          <div className="flex space-x-8">
            <Link to="/phaser" className="hover:underline">Phaser Game</Link>
            <Link to="/board" className="hover:underline">Collaborative Board</Link>
            <Link to="/chat" className="hover:underline">Chat</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h2 className="text-5xl font-bold text-blue-600 mb-6">Welcome to Nomad's Turf</h2>
        <p className="text-lg text-gray-700 mb-8">
          Collaborate, Communicate, and Innovate with ease.
        </p>
        <Link
          to="/login"
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
