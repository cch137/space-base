import "./style.css";
import Phaser from "phaser";

const canvas = document.createElement("canvas");
canvas.id = "app";
document.querySelector("main")!.appendChild(canvas);

const ORE_ASTERIOD_TYPES = 11;
const PLANET_TYPES = 5;

class GameScene extends Phaser.Scene {
  isDragging = false;
  lastPointerPosition = new Phaser.Math.Vector2();

  // images: new Map<string, Phaser.>

  constructor() {
    super("scene-game");
  }

  preload() {
    for (let i = 0; i < ORE_ASTERIOD_TYPES; i++)
      this.load.svg(`ore-astr-${i}`, `/assets/ore-asteroid-${i}.svg`);
    for (let i = 0; i < PLANET_TYPES; i++)
      this.load.svg(`planet-${i}`, `/assets/planet-${i}.svg`);
  }

  create() {
    for (let i = 0; i < ORE_ASTERIOD_TYPES; i++) {
      const sprite = this.add.image(64 + i * 64, 64, `ore-astr-${i}`);
      sprite.scale = 0.15;
      this.tweens.add({
        targets: sprite,
        angle: (Math.random() > 0.5 ? 1 : -1) * 360,
        repeat: -1,
        duration: Math.floor(Math.random() * 30000) + 30000,
      });
    }
    this.input.on(
      "pointerdown",
      (pointer: any) => {
        this.isDragging = true;
        this.lastPointerPosition.set(pointer.x, pointer.y);
      },
      this
    );
    this.input.on(
      "pointerup",
      () => {
        this.isDragging = false;
      },
      this
    );
    this.input.on(
      "pointermove",
      (pointer: any) => {
        if (this.isDragging) {
          const dx = pointer.x - this.lastPointerPosition.x;
          const dy = pointer.y - this.lastPointerPosition.y;

          // Update the position of the map or any object you are dragging
          // Example: this.map.x += dx; this.map.y += dy;

          this.lastPointerPosition.set(pointer.x, pointer.y);
        }
      },
      this
    );
  }

  update() {
    // Update your game logic here
  }
}

const game = new Phaser.Game({
  type: Phaser.WEBGL,
  canvas,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [GameScene],
});

window.addEventListener("resize", () => {
  game.canvas.width = window.innerWidth;
  game.canvas.height = window.innerHeight;
});
