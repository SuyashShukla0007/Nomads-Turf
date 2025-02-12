import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "../scenes/GameScene";

const PhaserGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 960,
      height: 960,
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      scene: [GameScene],
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div id="game"></div>;
};

export default PhaserGame;
