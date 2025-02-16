import React from "react";
import PhaserGame from "./components/Workspace/PhaserGame";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PhaserGame />}></Route>
    </Routes>
  );
};

export default App;
