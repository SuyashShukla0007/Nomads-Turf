import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "../scenes/GameScene";
import { useNavigate } from "react-router-dom";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 960,
      height: 960,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: { debug: true },
      },
      scene: [GameScene],
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  const goToPage = (page) => navigate(`/${page}`);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div id="game-container" className="w-full h-full"></div>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 bg-gradient-to-r from-blue-300/50 to-blue-400/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 z-50">
        <div className="relative w-[220px] h-[160px] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
          <div className="absolute top-0 left-0 w-full bg-blue-900/70 text-white text-center py-2 font-semibold z-10">
            Collaborative Whiteboard
          </div>
          <iframe
            src="/board"
            className="w-full h-full pointer-events-none rounded-xl"
            title="Whiteboard Preview"
          />
          <button
            onClick={() => goToPage("board")}
            className="absolute inset-0 bg-black/50 text-white font-medium flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl pointer-events-auto"
          >
            Open Board
          </button>
        </div>
        <div className="relative w-[220px] h-[160px] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
          <div className="absolute top-0 left-0 w-full bg-blue-900/70 text-white text-center py-2 font-semibold z-10">
            Chat Room
          </div>
          <iframe
            src="/chat"
            className="w-full h-full object-cover rounded-xl"
            title="Chat Preview"
          />
          <button
            onClick={() => goToPage("chat")}
            className="absolute inset-0 bg-black/50 text-white font-medium flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl pointer-events-auto"
          >
            Open Chat
          </button>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-white font-semibold hover:text-red-400 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PhaserGame;
