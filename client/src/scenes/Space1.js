import tilemap from "../assets/space2/map.json";
import player from "../assets/space2/player.png";
import interior from "../assets/space2/Interiors_free_32x32.png";
import room from "../assets/space2/Room_Builder_free_32x32.png";
export default class Space1 extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.localPlayer = null;
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
    // Load tilemap
    const map = this.make.tilemap({ key: "map" });

    // Add tileset to the map
    const interiorImage = map.addTilesetImage(
      "Interiors_free_32x32",
      "interior"
    );
    const RoomImage = map.addTilesetImage("Room_Builder_free_32x32", "room");
    //scale the player

    // Create layers

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
    // this.collisionLayer.renderDebug(this.add.graphics());
    // Set collision for the collisionLayer based on property "collides: true"
    this.collisionLayer.setCollisionByProperty({ collides: true });

    // Create player sprite with physics
    this.localPlayer = this.physics.add.sprite(100, 800, "player");
    this.localPlayer.setScale(1.5);
    this.physics.add.collider(this.localPlayer, this.collisionLayer);

    // this.cameras.main.startFollow(this.localPlayer, true, 0.08, 0.08); // Smooth follow
    // this.cameras.main.setZoom(1.5);

    // this.collisionLayer.setCollisionBetween(772,775);
    // this.collisionLayer.setCollisionBetween(804,806);
    // this.collisionLayer.setCollisionBetween(448,600);
    // this.collisionLayer.setCollisionBetween(640,800);
    // this.collisionLayer.setCollisionBetween(470,480);

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

    this.localPlayer.setSize(16, 24); // Reduce height to fit better
this.localPlayer.setOffset(0, 8);

    array.forEach((element) => {
      this.collisionLayer.setCollision(element);
    });

    // Add collision detection between player and collision layer
    // this.physics.add.collider(this.localPlayer, this.collisionLayer);

    // Set player bounds to prevent moving out of the world
    this.localPlayer.setCollideWorldBounds(true);

    // Create cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    //animation for sideways movement

    this.anims.create({
      key: "sideway",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 2, 3, 4, 5],
      }),
      frameRate: 10,
      // repeat:-1
    });

    //animation for up movement

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [19, 20, 21, 22, 23],
      }),
      frameRate: 10,
      // repeat:-1
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      // repeat:-1
    });

    // Add a debug layer to visualize the collision tiles
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.collisionLayer.renderDebug(debugGraphics, {
      tileColor: null, // Make it transparent
      collidingTileColor: new Phaser.Display.Color(255, 0, 0), // Red for colliding tiles
      faceColor: new Phaser.Display.Color(255, 0, 0), // Red face color for debug
    });
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
  }
}
