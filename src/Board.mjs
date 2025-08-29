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
    if (this.block.matrix.length === 1) {
      if (nextX >= this.height || this.grid[nextX][this.pos.y] === "X") {
        this.isFalling = false; return;
      }} else {
      if (nextX >= this.height - 1 || this.grid[nextX][this.pos.y] === "X") {
      this.isFalling = false;
      return;
    }
  };
    const midCol = Math.floor((this.grid[0].length - this.block.matrix[0].length)/2);
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") {
          this.grid[currentX + row][col+ midCol] = "."
        }
      }
    }

    this.drawBlock(this.block.matrix, nextX);
  }

  hasFalling() { return this.isFalling; }

  drawBlock(block, position) {
    const midCol = Math.floor((this.grid[0].length - block[0].length)/2)
    for (let row=0; row < block.length; row++) {
      for (let col=0; col < block[row].length; col++) {
        if (block[row][col] !== ".") { 
          this.grid[position + row][midCol + col] = block[row][col];
        }
      }
  }}

  cleanBoard(position) {
    const midCol = Math.floor((this.grid[0].length - this.block.matrix[0].length)/2);
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") { this.grid[position + row][midCol + col] = "."; }
      }
  }}

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    this.pos.x = 0;
    this.drawBlock(this.block.matrix, 0);
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
