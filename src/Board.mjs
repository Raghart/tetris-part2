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

    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") {
          this.grid[nextX + row][col+ midCol] = this.block.matrix[row][col]
        }
      }
    }
  }

  hasFalling() { return this.isFalling; }

  drawInBoard(block, position) {
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== "." && Array.isArray(block)) { 
          this.grid[position + row][midCol + col] = block[row][col];
        } else { this.grid[position + row][midCol + col] = "."; }
      }
    }}

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    this.pos.x = 0;
    const midCol = Math.floor((this.grid[0].length - this.block.matrix[0].length)/2);

    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) {
        if (this.block.matrix[row][col] !== ".") { 
          this.grid[0 + row][midCol + col] = this.block.matrix[row][col];
        }
      }
    }
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
