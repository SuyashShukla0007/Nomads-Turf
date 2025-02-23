import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
// import Home from "./components/Home";
import PhaserGame from "./components/Workspace/PhaserGame";
import Board from "./components/Board";
import Chat from "./components/Chat";

import ChooseWorkspace from "./pages/ChooseWorkspace";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<PhaserGame />} />

      {/* <Route path="/phaser" element={<PhaserGame />} /> */}
      <Route path="/board" element={<Board />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/workspaces" element={<ChooseWorkspace />}></Route>
      <Route path="/workspace/:space" element={<PhaserGame />}></Route>
    </Routes>
  );
};

export default App;
