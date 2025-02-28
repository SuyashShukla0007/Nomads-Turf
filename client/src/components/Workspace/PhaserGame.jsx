import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
// import { io } from "socket.io-client";
import { Menu, X, Pencil, MessageCircle, LogOut, Gamepad2 } from 'lucide-react';
import Space1 from "../../scenes/space1";
import Space2 from "../../scenes/space2";
import { useNavigate } from "react-router-dom";

const PhaserGame = () => {
  const gameRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //get space from url
    const space = window.location.pathname.split("/")[2];
   
    const config = {
      type: Phaser.AUTO,
      width: space == 'space1' ? 960 : 1280,
      height: space == 'space1' ? 960 : 640,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      scene: [space == 'space1' ? Space2 : Space1],
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  useEffect(() => {
    const check = window.location.pathname.split("/")[2];
    if(check == 'space1') {
      setOpen(true);
    }
  }, []);

  const goToPage = (page) => navigate(`/${page}`);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden"
    style={{ backgroundImage: "url('/src/assets/VIRTUALBG.jpg')" }}>
      <div className="flex items-start">
        <div id="game-container" className="w-full h-full flex items-center justify-center">


      </div>
        <button 
          onClick={() => setOpen(!open)} 
          className="absolute right-6 top-6 z-10 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Gamepad2 className="h-5 w-5" />
          <span className="font-medium">Features</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900/95 to-indigo-900/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-indigo-500/30 max-w-4xl w-full mx-4 animate-fadeIn relative">
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-2 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <h2 className="text-white font-bold text-2xl mb-6 flex items-center">
              <Gamepad2 className="h-6 w-6 mr-2 text-indigo-400" />
              Game Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-lg group">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-indigo-800 to-blue-900 text-white text-center py-2 font-semibold z-10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />Video Calling
                </div>
                <iframe
                  src="/call"
                  className="w-full h-full pointer-events-none rounded-xl"
                  title="Video Call Preview"
                />
                <button
                  onClick={() => goToPage("call")}
                  className="absolute inset-0 bg-black/60 text-white font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-auto"
                >
                  <span className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                    Open Video Call
                  </span>
                </button>
              </div>
             
              <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-lg group">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-indigo-800 to-blue-900 text-white text-center py-2 font-semibold z-10 flex items-center justify-center">
                  <Gamepad2 className="h-4 w-4 mr-2" />Tic Tac Toe
                </div>
                <iframe
                  src="/tic-tac-toe"
                  className="w-full h-full pointer-events-none rounded-xl"
                  title="Tic Tac Toe Preview"
                />
                <button
                  onClick={() => goToPage("tic-tac-toe")}
                  className="absolute inset-0 bg-black/60 text-white font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-auto"
                >
                  <span className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                    Play Tic Tac Toe
                  </span>
                </button>
              </div>

              <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-lg group">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-indigo-800 to-blue-900 text-white text-center py-2 font-semibold z-10 flex items-center justify-center">
                  <Gamepad2 className="h-4 w-4 mr-2" />Guess Game
                </div>
                <iframe
                  src="/guess"
                  className="w-full h-full pointer-events-none rounded-xl"
                  title="Guess Game Preview"
                />
                <button
                  onClick={() => goToPage("guess")}
                  className="absolute inset-0 bg-black/60 text-white font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-auto"
                >
                  <span className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                    Play Guess Game
                  </span>
                </button>
              </div>
              
              <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-lg group">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-indigo-800 to-blue-900 text-white text-center py-2 font-semibold z-10 flex items-center justify-center">
                  <Pencil className="h-4 w-4 mr-2" />Collaborative Whiteboard
                </div>
                <iframe
                  src="/board"
                  className="w-full h-full pointer-events-none rounded-xl"
                  title="Whiteboard Preview"
                />
                <button
                  onClick={() => goToPage("board")}
                  className="absolute inset-0 bg-black/60 text-white font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-auto"
                >
                  <span className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                    Open Whiteboard
                  </span>
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-lg bg-gradient-to-r from-red-500/70 to-red-600/70 hover:from-red-500/90 hover:to-red-600/90 transition-all shadow-lg"
              >
                <LogOut className="h-5 w-5" /> Exit Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaserGame;