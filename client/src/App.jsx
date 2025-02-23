import React from "react";
import PhaserGame from "./components/Workspace/PhaserGame";
import { Routes, Route } from "react-router-dom";
import ChooseWorkspace from "./pages/ChooseWorkspace";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PhaserGame />}></Route>
      <Route path="/workspaces" element={<ChooseWorkspace />}></Route>
      <Route path="/workspace/:space" element={<PhaserGame />}></Route>
    </Routes>
  );
};

export default App;
