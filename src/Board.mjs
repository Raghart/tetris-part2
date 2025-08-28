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

    if (nextX >= this.height || this.grid[nextX][this.pos.y] === "X") {
      this.isFalling = false;
      return;
    };
    this.grid[currentX][this.pos.y] = ".";
    this.grid[nextX][this.pos.y] = this.block.matrix[0][0];
  }

  hasFalling() { return this.isFalling; }

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    const midCol = Math.floor((this.grid[0].length - this.block.matrix[0].length)/2);

    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") { 
          this.grid[this.pos.x = 0 + row][midCol + col] = this.block.matrix[row][col] 
        }
      }
    }
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
