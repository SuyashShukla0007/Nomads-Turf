// Space1.js
import Phaser from "phaser";
import { io } from "socket.io-client";
import tilemap from "../assets/space2/map.json";
import player from "../assets/space2/player.png";
import interior from "../assets/space2/Interiors_free_32x32.png";
import room from "../assets/space2/Room_Builder_free_32x32.png";

export default class Space1 extends Phaser.Scene {
  constructor(props) {
    super("GameScene");
    this.localPlayer = null;
    this.otherPlayers = {};
    this.socket = null;
    // this.onShowPopup = props.onShowPopup; // Store the popup function
  }

  preload() {
    // Load assets
    this.load.spritesheet("player", player, {
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.tilemapTiledJSON("map", tilemap);
    this.load.image("interior", interior);
    this.load.image("room", room);
  }

  create() {
    // Setup socket connection
    this.socket = io("http://localhost:5000");

    //camera follow player

    // Setup map
    const map = this.make.tilemap({ key: "map" });
    const interiorImage = map.addTilesetImage(
      "Interiors_free_32x32",
      "interior"
    );
    const RoomImage = map.addTilesetImage("Room_Builder_free_32x32", "room");

    this.groundLayer = map.createLayer(
      "floor",
      [RoomImage, interiorImage],
      0,
      0
    );
    this.floor = map.createLayer("normal", [RoomImage, interiorImage], 0, 0);
    this.collisionLayer = map.createLayer(
      "collision",
      [RoomImage, interiorImage],
      0,
      0
    );
    // Smooth follow
    // Smooth follow
    // Set collision properties for the collision layer
    this.collisionLayer.setCollisionByProperty({ collides: true });

    // Setup animations
    this.anims.create({
      key: "sideway",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 2, 3, 4, 5],
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [19, 20, 21, 22, 23],
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [6, 7, 8, 9, 10],
      }),
      frameRate: 10,
    });

    // Setup input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Socket event handlers
    this.socket.on("connect", () => {
      console.log("Connected to server with ID:", this.socket.id);
      this.socket.emit("join", { x: 100, y: 100, room: "space1" });
    });

    // Handle current players
    this.socket.on("currentPlayers", (players) => {
      players.forEach((playerInfo) => {
        if (playerInfo.socketId === this.socket.id) {
          this.createLocalPlayer(playerInfo);
        } else {
          this.createOtherPlayer(playerInfo);
        }
      });
    });

    // Handle new player joining
    this.socket.on("newPlayer", (playerInfo) => {
      this.createOtherPlayer(playerInfo);
    });

    // Handle player movement
    this.socket.on("movementUpdate", (playerInfo) => {
      this.updateOtherPlayerPosition(
        playerInfo.socketId,
        playerInfo.x,
        playerInfo.y
      );
    });

    // Handle player disconnection
    this.socket.on("playerDisconnected", (socketId) => {
      this.removeOtherPlayer(socketId);
    });

    const array = [
      [
        1465, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488,
        1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488,
        1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488, 1488,
        1488, 1488, 1488, 1464, 1431, 1430, 1431, 1430, 1431, 1430, 1431, 1226,
        1227, 1224, 1225, 1430, 1431, 1242, 1243, 741, 52, 52, 52, 52, 52, 52,
        52, 52, 741, 1240, 1241, 1430, 1431, 1258, 1259, 757, 49, 68, 50, 68,
        50, 68, 50, 68, 50, 68, 50, 68, 50, 68, 50, 68, 51, 757, 1256, 1257,
        1430, 1431, 1430, 1431, 1430, 1431, 1430, 1465, 1488, 1488, 1488, 1488,
        1488, 1488, 1488, 1488, 1488, 1464, 1465, 1488, 1488, 1488, 1488, 1488,
        1488, 1488, 1488, 1488, 1464, 1431, 1430, 1431, 1430, 1431, 1430, 1431,
        1430, 1431, 1430, 1431, 536870961, 2684354609, 1430, 1431, 1610612788,
        1610612804, 2684354628, 2684354612, 1430, 1431, 536870963, 2684354611,
        1430, 1431, 1430, 1431, 1430, 1431, 1430, 1431, 1430, 3221226936,
        1073743312, 1073743312, 1073743312, 1073743312, 1073743312, 1073743312,
        1073743312, 1073743312, 1073743312, 3221226937, 1073743312, 1073743312,
        1073743312, 1073743312, 1073743312, 1073743312, 1073743312, 1073743312,
        1073743312, 1073743312, 1073743312, 1073743312, 1073743312, 1073743312,
        1073743312, 1073743312, 1073743312, 1073743312, 3221226936, 1073743312,
        1073743312, 1073743312, 1073743312, 1073743312, 1073743312, 1073743312,
        1073743312, 1073743312, 3221226937,
      ],
    ];

    array.forEach((element) => {
      this.collisionLayer.setCollision(element);
    });
  }

  createLocalPlayer(playerInfo) {
    this.localPlayer = this.physics.add.sprite(
      playerInfo.x,
      playerInfo.y,
      "player"
    );
    this.localPlayer.setScale(1.5);
    this.localPlayer.setSize(16, 24);
    this.localPlayer.setOffset(0, 8);
    this.localPlayer.setCollideWorldBounds(true);
    this.physics.add.collider(this.localPlayer, this.collisionLayer);
  }

  createOtherPlayer(playerInfo) {
    const otherPlayer = this.physics.add.sprite(
      playerInfo.x,
      playerInfo.y,
      "player"
    );
    otherPlayer.setScale(1.5);
    otherPlayer.setSize(16, 24);
    otherPlayer.setOffset(0, 8);
    this.physics.add.collider(otherPlayer, this.collisionLayer);
    otherPlayer.anims.play("down", true); // Default animation for other players
    this.otherPlayers[playerInfo.socketId] = otherPlayer;
  }

  updateOtherPlayerPosition(socketId, x, y) {
    const otherPlayer = this.otherPlayers[socketId];
    if (!otherPlayer) return;

    // Interpolate position for smooth movement
    const speed = 5; // Adjust speed as necessary
    const dx = x - otherPlayer.x;
    const dy = y - otherPlayer.y;

    // Calculate distance
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the distance is greater than a threshold, move towards the new position
    if (distance > 1) {
      otherPlayer.x += (dx / distance) * speed;
      otherPlayer.y += (dy / distance) * speed;

      // Update animation based on movement direction
      if (Math.abs(dx) > Math.abs(dy)) {
        // Moving horizontally
        otherPlayer.anims.play("sideway", true);
        otherPlayer.flipX = dx < 0; // Flip sprite based on direction
      } else if (dy < 0) {
        // Moving up
        otherPlayer.anims.play("up", true);
      } else if (dy > 0) {
        // Moving down
        otherPlayer.anims.play("down", true);
      }
    } else {
      // Not moving
      otherPlayer.anims.stop();
    }
  }

  removeOtherPlayer(socketId) {
    const otherPlayer = this.otherPlayers[socketId];
    if (otherPlayer) {
      otherPlayer.destroy();
      delete this.otherPlayers[socketId];
    }
  }

  update() {
    if (!this.localPlayer) return;

    const speed = 150;
    let velocityX = 0;
    let velocityY = 0;
    let moved = false;

    if (this.cursors.left.isDown) {
      velocityX = -speed;
      this.localPlayer.anims.play("sideway", true);
      this.localPlayer.flipX = true;
      moved = true;
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
      this.localPlayer.anims.play("sideway", true);
      this.localPlayer.flipX = false;
      moved = true;
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed;
      this.localPlayer.anims.play("up", true);
      moved = true;
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
      this.localPlayer.anims.play("down", true);
      moved = true;
    }

    if (!moved) {
      this.localPlayer.anims.stop();
    }

    this.localPlayer.setVelocity(velocityX, velocityY);

    // Check for collision with the collision layer
    this.physics.collide(this.localPlayer, this.collisionLayer);

    if (moved) {
      this.socket.emit("movement", {
        x: this.localPlayer.x,
        y: this.localPlayer.y,
        room: "space1", // Ensure you send the room information
      });
    }

    // Check for nearby players
    // const proximityThreshold = 100; // Adjust this value as needed
    // for (const socketId in this.otherPlayers) {
    //   const otherPlayer = this.otherPlayers[socketId];
    //   const distance = Phaser.Math.Distance.Between(this.localPlayer.x, this.localPlayer.y, otherPlayer.x, otherPlayer.y);

    //   if (distance < proximityThreshold) {
    //     this.onShowPopup(`Hello, ${socketId}!`); // Call the popup function
    //   }
    // }
  }
}
