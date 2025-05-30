import React from "react"
import Lobby from "./pages/Lobby"
import RoomPage from "./pages/RoomPage"
import PhaserGame from "./components/Workspace/PhaserGame"
import Board from "./components/Board"
import Chat from "./components/Chat"
import Guess from "./components/Workspace/popUps/Guess"

import ChooseWorkspace from "./pages/ChooseWorkspace"
import TicTacToe from "./components/Workspace/popUps/TicTacToe"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./components/AuthPage"
import HomePage from "./components/HomePage"
import GamesPage from "./components/GamesPage"
import Todo from "./components/Todo"
// import StickyNotes from "./components/StickyNotes";

import AfterAuth from "./pages/AfterAuth"
const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<PhaserGame />} />

      <Route path="/todo" element={<Todo />} />
      <Route path="/call" element={<Lobby />} />
      <Route path="/call/room/:roomId" element={<RoomPage />} />
      <Route path="/after-auth" element={<AfterAuth />}></Route>
      {/* <Route path="/phaser" element={<PhaserGame />} /> */}
      <Route path="/workspace/:space" element={<PhaserGame />} />
      <Route path="/workspaces" element={<ChooseWorkspace />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/board" element={<Board />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/guess" element={<Guess />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/workspaces" element={<ChooseWorkspace />}></Route>
      <Route path="/workspace/:space" element={<PhaserGame />}></Route>
      <Route path="/games" element={<GamesPage />} />
      {/* <Route path="/games/tic-tac-toe" element={<TicTacToe />} /> */}
      {/* <Route path="/games/guess" element={<Guess />} /> */}
    </Routes>
  )
}

export default App
