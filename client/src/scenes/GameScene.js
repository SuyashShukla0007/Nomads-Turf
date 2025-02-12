import tilemap from "../assets/map.json";
import player from "../assets/player.png";
import tileset from "../assets/tileset.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.localPlayer = null;
  }

  preload() {
    // Load assets
    this.load.spritesheet("player", player, {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.tilemapTiledJSON("map", tilemap);
    this.load.image("tiles", tileset);
  }

  create() {
    // Load tilemap
    const map = this.make.tilemap({ key: "map" });

    // Add tileset to the map
    const tilesetImage = map.addTilesetImage("LargePixelOffice", "tiles");

    //scale the player

    // Create layers
    this.groundLayer = map.createLayer("GroundLayer", tilesetImage, 0, 0);
    this.collisionLayer = map.createLayer("CollisionLayer", tilesetImage, 0, 0);
    // this.collisionLayer.renderDebug(this.add.graphics());
    // Set collision for the collisionLayer based on property "collides: true"
    this.collisionLayer.setCollisionByProperty({ collides: true });

    // Create player sprite with physics
    this.localPlayer = this.physics.add.sprite(100, 800, "player");
    this.localPlayer.setScale(0.8);
    this.physics.add.collider(this.localPlayer, this.collisionLayer);

    this.cameras.main.startFollow(this.localPlayer, true, 0.08, 0.08); // Smooth follow
    this.cameras.main.setZoom(1.5);

    // this.collisionLayer.setCollisionBetween(772,775);
    // this.collisionLayer.setCollisionBetween(804,806);
    // this.collisionLayer.setCollisionBetween(448,600);
    // this.collisionLayer.setCollisionBetween(640,800);
    // this.collisionLayer.setCollisionBetween(470,480);

    const array = [
      [
        76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
        94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 108, 109, 110,
        111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124,
        125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 140,
        141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154,
        155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184,
        185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198,
        199, 200, 201, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214,
        215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228,
        229, 230, 231, 232, 233, 236, 237, 238, 239, 240, 241, 242, 243, 244,
        245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258,
        259, 260, 261, 262, 263, 264, 265, 268, 269, 270, 271, 272, 273, 274,
        275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288,
        289, 290, 291, 292, 293, 294, 295, 296, 297, 300, 301, 302, 303, 304,
        305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318,
        319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 332, 333, 334,
        335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348,
        349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 364,
        365, 366, 367, 368, 369, 268, 269, 270, 373, 374, 375, 376, 377, 378,
        379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392,
        393, 396, 397, 398, 399, 400, 401, 268, 269, 270, 405, 406, 407, 408,
        409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422,
        423, 424, 425, 428, 429, 430, 431, 432, 433, 268, 269, 270, 437, 438,
        439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452,
        453, 454, 455, 456, 457, 460, 461, 462, 463, 464, 465, 469, 470, 476,
        477, 481, 482, 483, 484, 485, 486, 487, 488, 489, 526, 527, 528, 529,
        530, 531, 532, 533, 534, 535, 540, 541, 542, 543, 544, 545, 546, 547,
        548, 549, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 572, 573,
        574, 575, 576, 577, 578, 579, 580, 581, 592, 593, 594, 595, 596, 597,
        598, 599, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 624, 625,
        626, 627, 628, 639, 640, 641, 642, 668, 669, 670, 671, 672, 659, 660,
        661, 662, 663, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 700,
        701, 702, 703, 704, 691, 692, 693, 694, 695, 700, 701, 702, 703, 704,
        705, 706, 707, 708, 709, 732, 733, 734, 735, 736, 737, 738, 732, 733,
        734, 735, 736, 737, 738, 739, 740, 741, 766, 767, 768, 769, 770, 767,
        768, 769, 770, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 797,
        798, 799, 800, 801, 802, 803, 804, 805, 814, 815, 816, 817, 818, 819,
        820, 565, 822, 823, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836,
        837, 848, 849, 850, 851, 852, 522, 859, 860, 862, 863, 864, 865, 866,
        867, 868, 869, 880, 881, 882, 883, 884,
      ],
    ];

    array.forEach((element) => {
      this.collisionLayer.setCollision(element);
    });

    // Add collision detection between player and collision layer
    // this.physics.add.collider(this.localPlayer, this.collisionLayer);

    // Set player bounds to prevent moving out of the world
    this.localPlayer.setCollideWorldBounds(true);

    // Create cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add a debug layer to visualize the collision tiles
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // this.collisionLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Make it transparent
    //   collidingTileColor: new Phaser.Display.Color(255, 0, 0), // Red for colliding tiles
    //   faceColor: new Phaser.Display.Color(255, 0, 0), // Red face color for debug
    // });
  }

  update() {
    if (!this.localPlayer) return;

    const speed = 150;
    let velocityX = 0;
    let velocityY = 0;

    // Handle movement using cursor keys
    if (this.cursors.left.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
    }

    // Update player velocity for movement
    this.localPlayer.setVelocity(velocityX, velocityY);
  }
}
