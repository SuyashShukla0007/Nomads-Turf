import React from "react"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./components/AuthPage"
import Lobby from "./pages/Lobby"
import RoomPage from "./pages/Room"
import PhaserGame from "./components/Workspace/PhaserGame"
import Board from "./components/Board"
import Chat from "./components/Chat"
import Guess from "./components/Workspace/popUps/Guess"

import ChooseWorkspace from "./pages/ChooseWorkspace"
import TicTacToe from "./components/Workspace/popUps/TicTacToe"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<PhaserGame />} />
      <Route path="/call" element={<Lobby />} />
      <Route path="/call/room/:roomId" element={<RoomPage />} />
      {/* <Route path="/phaser" element={<PhaserGame />} /> */}
      <Route path="/board" element={<Board />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/guess" element={<Guess />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/workspaces" element={<ChooseWorkspace />}></Route>
      <Route path="/workspace/:space" element={<PhaserGame />}></Route>
    </Routes>
  )
}

export default App
