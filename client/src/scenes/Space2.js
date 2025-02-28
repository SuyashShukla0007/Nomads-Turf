// GameScene.js
import Phaser from "phaser";
import { io } from "socket.io-client";
import tilemap from "../assets/space1/map2.json";
import player from "../assets/space1/player2.png";
import tileset from "../assets/space1/tileset.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.localPlayer = null;
    this.otherPlayers = {};
    this.socket = null;
  }

  preload() {
    // Load assets
    this.load.spritesheet("player", player, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.tilemapTiledJSON("map", tilemap);
    this.load.image("tiles", tileset);
  }

  create() {
    // Setup socket connection
    this.socket = io("http://localhost:5000");

    // Load tilemap
    const map = this.make.tilemap({ key: "map" });

    // Add tileset to the map
    const tilesetImage = map.addTilesetImage("LargePixelOffice", "tiles");

    // Create layers
    this.groundLayer = map.createLayer("GroundLayer", tilesetImage, 0, 0);
    this.collisionLayer = map.createLayer("CollisionLayer", tilesetImage, 0, 0);
    this.collisionLayer.setCollisionByProperty({ collides: true });

    // Create player sprite with physics
    this.localPlayer = this.physics.add.sprite(100, 800, "player");
    this.localPlayer.setScale(3);
    this.localPlayer.setCollideWorldBounds(true);
    this.physics.add.collider(this.localPlayer, this.collisionLayer);

    // Setup camera
    this.cameras.main.startFollow(this.localPlayer, true, 0.08, 0.08);
    this.cameras.main.setZoom(0.8);

    // Create cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Setup animations
    this.createAnimations();

    // Socket event handlers
    this.socket.on("connect", () => {
      console.log("Connected to server with ID:", this.socket.id);
      this.socket.emit("join", { x: this.localPlayer.x, y: this.localPlayer.y, room: "space1" });
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
      this.updateOtherPlayerPosition(playerInfo.socketId, playerInfo.x, playerInfo.y);
    });

    // Handle player disconnection
    this.socket.on("playerDisconnected", (socketId) => {
      this.removeOtherPlayer(socketId);
    });
  }

  createAnimations() {
    this.anims.create({
      key: "sideway",
      frames: this.anims.generateFrameNumbers("player", { frames: [1, 6, 11] }),
      frameRate: 10,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 5, 10] }),
      frameRate: 10,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { frames: [2, 7, 12] }),
      frameRate: 10,
    });
  }

  createLocalPlayer(playerInfo) {
    this.localPlayer.setPosition(playerInfo.x, playerInfo.y);
  }

  createOtherPlayer(playerInfo) {
    const otherPlayer = this.physics.add.sprite(playerInfo.x, playerInfo.y, "player");
    otherPlayer.setScale(3);
    otherPlayer.setCollideWorldBounds(true);
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

    // Handle movement using cursor keys
    if (this.cursors.left.isDown) {
      velocityX = -speed;
      this.localPlayer.anims.play("sideway", true);
      this.localPlayer.flipX = true;
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
      this.localPlayer.anims.play("sideway", true);
      this.localPlayer.flipX = false;
    } else if (this.cursors.up.isDown) {
      velocityY = -speed;
      this.localPlayer.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
      this.localPlayer.anims.play("down", true);
    } else {
      this.localPlayer.anims.stop();
    }

    // Update player velocity for movement
    this.localPlayer.setVelocity(velocityX, velocityY);

    // Emit movement to server
    if (velocityX !== 0 || velocityY !== 0) {
      this.socket.emit("movement", {
        x: this.localPlayer.x,
        y: this.localPlayer.y,
        room: "space1", // Ensure you send the room information
      });
    }
  }
}