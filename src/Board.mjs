import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  grid; 
  pos;
  block;
  isFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array.from({ length: width }, () => "."));
    this.pos = { x: 0, y: Math.floor(this.width / 2) };
    this.block = null;
    this.isFalling = false;
  }

  tick() {
    if (!this.hasFalling()) return;
    const nextX = this.pos.x + 1;
    if (this.block.matrix.length === 1 && (nextX >= this.height || this.grid[nextX][this.pos.y] === "X")) {
      this.isFalling = false; 
      return;
    }

    if (this.block.matrix.length !== 1 && (nextX >= this.height - 1 || this.grid[nextX+1].includes("T"))) {
      this.isFalling = false;
      return;
    };
    this.updateBlock(this.pos, this.block.matrix, ".");
    this.pos.x = nextX;
    this.updateBlock(this.pos, this.block.matrix);
  }

  hasFalling() { return this.isFalling; }

  updateBlock(position, block, fillStr = null) {
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") { 
          this.grid[position.x + row][position.y + col] = fillStr ?? block[row][col]; 
        }
      }
  }}

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    this.pos.x = 0;
    this.pos.y = Math.floor((this.grid[0].length - this.block.matrix[0].length)/2);
    this.updateBlock(this.pos, this.block.matrix);
  }

  tryMove(move) {
    const { dx, dy } = move;
    if (dx < 0) {
      this.updateBlock(this.pos, this.block.matrix, ".");
      this.updateBlock({ x: this.pos.x, y: --this.pos.y }, this.block.matrix);
    }

    if (dx > 0) {
      this.updateBlock(this.pos, this.block.matrix, ".");
      this.updateBlock({ x: this.pos.x, y: ++this.pos.y }, this.block.matrix);
    }

    if (dy > 0) {
      this.updateBlock(this.pos, this.block.matrix, ".");
      this.updateBlock({ x: ++this.pos.x, y: this.pos.y }, this.block.matrix);
    }
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
