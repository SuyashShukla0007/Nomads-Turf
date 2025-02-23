import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
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

      <div className="flex justify-around mt-16 flex-wrap gap-8">

        <div className="relative w-[350px] h-[300px] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 w-full bg-blue-600/70 text-white text-center py-2 font-semibold z-30">
            Phaser Game
          </div>
          <iframe
            src="/phaser"
            title="Phaser Game"
            className="w-[700px] h-[500px] scale-[0.5] origin-top-left z-10"
          />
          <Link
            to="/phaser"
            className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 z-20"
          >
            Open Game
          </Link>
        </div>

        <div className="relative w-[350px] h-[300px] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 w-full bg-green-600/70 text-white text-center py-2 font-semibold z-30">
            Collaborative Board
          </div>
          <iframe
            src="/board"
            title="Collaborative Board"
            className="w-[700px] h-[500px] scale-[0.5] origin-top-left z-10"
          />
          <Link
            to="/board"
            className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 z-20"
          >
            Open Board
          </Link>
        </div>

        <div className="relative w-[350px] h-[300px] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="absolute top-0 left-0 w-full bg-purple-600/70 text-white text-center py-2 font-semibold z-30">
            Chat Room
          </div>
          <iframe
            src="/chat"
            title="Chat Room"
            className="w-[700px] h-[500px] scale-[0.5] origin-top-left z-10"
          />
          <Link
            to="/chat"
            className="absolute bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 z-20"
          >
            Open Chat
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;
