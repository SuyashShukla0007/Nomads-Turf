import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "../../scenes/GameScene";

const PhaserGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1280,
      height: 640,
      physics: {
        default: "arcade",
        arcade: { debug: true },
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
