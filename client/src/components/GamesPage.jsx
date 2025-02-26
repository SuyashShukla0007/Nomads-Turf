import React from "react";
import { useNavigate } from "react-router-dom";

const GamesPage = () => {
  const navigate = useNavigate();

  const games = [
    { name: "Tic-Tac-Toe", path: "/games/tic-tac-toe" },
    { name: "Guess the Word", path: "/games/guess" },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-12">🎮 Choose Your Game</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {games.map((game, index) => (
          <div
            key={index}
            onClick={() => navigate(game.path)}
            className="cursor-pointer p-6 bg-gradient-to-r from-[#6C63FF] to-[#8A63FF] rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300 text-center"
          >
            <h2 className="text-3xl font-bold">{game.name}</h2>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/home")}
        className="mt-16 px-8 py-4 bg-[#8A63FF] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default GamesPage;
