import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import Space1 from "../../scenes/space1";
import Space2 from "../../scenes/space2";
const PhaserGame = () => {
  const gameRef = useRef(null);



  useEffect(() => {
    //get space from url
    const space=window.location.pathname.split("/")[2];
   

    const config = {
      type: Phaser.AUTO,
      width: space=='space1'?960:1280,
      height: space=='space1'?960:640,
      physics: {
        default: "arcade",
        arcade: { debug: true },
      },
      scene: [space=='space1'?Space2:Space1],
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
