import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import PhaserGame from "./components/PhaserGame";
import Board from "./components/Board";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<PhaserGame />} />

      {/* <Route path="/phaser" element={<PhaserGame />} /> */}
      <Route path="/board" element={<Board />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
