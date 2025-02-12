// // src/main.js
// import Phaser, { Scale } from 'phaser';
// import GameScene from './GameScene.js';

// const config = {
//   type: Phaser.AUTO,
//   width: 960,
//   height: 960,
//   scene: [GameScene],
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH
//   },
//   physics: {
//     default: "arcade",
//     arcade: {
//       gravity: { y: 0 },
//       debug: false,
//     },
//   },
// };

// new Phaser.Game(config);

import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
