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
    this.block = "";
    this.isFalling = false;
  }

  tick() {
    if (!this.hasFalling()) return;
    const currentX = this.pos.x
    const nextX = ++this.pos.x;
    if (this.block.matrix.length === 1 && (nextX >= this.height || this.grid[nextX][this.pos.y] === "X")) {
      this.isFalling = false; 
      return;
    }

    if (this.block.matrix.length !== 1 && (nextX >= this.height - 1 || this.grid[nextX+1][this.pos.y] === "T")) {
      this.isFalling = false;
      return;
    };
    this.updateBlock(currentX, this.block.matrix, ".");
    this.updateBlock(nextX, this.block.matrix);
  }

  hasFalling() { return this.isFalling; }

  updateBlock(position, block, fillStr = null) {
    const midCol = Math.floor((this.grid[0].length - this.block.matrix[0].length)/2);
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") { 
          this.grid[position + row][midCol + col] = fillStr ?? block[row][col]; 
        }
      }
  }}

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    this.pos.x = 0;
    this.updateBlock(0, this.block.matrix);
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
