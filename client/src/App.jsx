import React from "react";
import PhaserGame from "./components/PhaserGame";
import AuthPage from "./components/AuthPage";
import {Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route path="/phaser" element={<PhaserGame/>}></Route>
      <Route path="/" element={<AuthPage/>}></Route>
    </Routes>
  );
};

export default App;
