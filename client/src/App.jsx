import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import PhaserGame from "./components/Workspace/PhaserGame";
import Board from "./components/Board";
import Chat from "./components/Chat";
import ChooseWorkspace from "./pages/ChooseWorkspace";
import TicTacToe from "./components/Workspace/popUps/TicTacToe";
import Guess from "./components/Workspace/popUps/Guess";
import GamesPage from "./components/GamesPage";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<PhaserGame />} />

      <Route path="/workspace/:space" element={<PhaserGame />} />
      <Route path="/workspaces" element={<ChooseWorkspace />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/board" element={<Board />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/games/guess" element={<Guess />} />
    </Routes>
  );
};

export default App;
