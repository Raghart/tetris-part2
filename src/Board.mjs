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
    this.pos = { y: 0, x: Math.floor(this.width / 2) };
    this.block = null;
    this.isFalling = false;
  }

  tick() {
    if (!this.hasFalling()) return;
    const nextRow = this.pos.y + 1;
    if (this.block.matrix.length === 1 && (nextRow >= this.height || this.grid[nextRow][this.pos.x] === "X")) {
      this.isFalling = false; 
      return;
    }

    if (this.block.matrix.length !== 1 && (nextRow + this.block.height > this.height || 
      this.grid[nextRow+1].includes("T"))) {
      this.isFalling = false;
      return;
    };
    this.updateBlock(this.pos, this.block.matrix, ".");
    this.pos.y = nextRow;
    this.updateBlock(this.pos, this.block.matrix);
  }

  hasFalling() { return this.isFalling; }

  updateBlock(position, block, fillStr = null) {
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") { 
          this.grid[position.y + row][position.x + col] = fillStr ?? block[row][col]; 
        }
      }
  }}

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    this.pos.y = 0;
    this.pos.x = Math.floor((this.grid[0].length - this.block.width)/2);
    this.updateBlock(this.pos, this.block.matrix);
  }

  tryMove(move) {
    const { dx, dy } = move;
    if (this.pos.x + dx < 0) return;
    if (this.pos.x + dx + this.block.width > this.width) return;
    if (this.pos.y + dy + this.block.height > this.height || 
      this.grid[dy+this.block.height][this.width/2] !== ".") {
      this.isFalling = false;
      return;
    };

    this.updateBlock(this.pos, this.block.matrix, ".");
    this.pos.y += dy;
    this.pos.x += dx;
    this.updateBlock(this.pos, this.block.matrix);
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
