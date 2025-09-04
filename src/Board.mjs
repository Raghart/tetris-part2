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
    if (this.block.matrix.length === 1 && (nextRow >= this.height || this.isBlockBellow())) {
      this.isFalling = false; 
      return;
    }

    if (this.block.matrix.length !== 1 && (nextRow + this.block.height > this.height || this.isBlockBellow())) {
      this.isFalling = false;
      return;
    };
    const move = { dy: 1, dx: 0 };
    this.updateBlock(this.block, move);
  }

  hasFalling() { return this.isFalling; }

  updateBlock(block, move = { dy: 0, dx: 0 }) {
    for (let row=0; row < this.block.matrix.length; row++) {
      for (let col=0; col < this.block.matrix[row].length; col++) { 
        if (this.block.matrix[row][col] !== ".") { 
          this.grid[this.pos.y + row][this.pos.x + col] = "."; 
        }
      }
    } 

    this.pos.x += move.dx;
    this.pos.y += move.dy;
    this.block = block;

    for (let row=0; row < block.matrix.length; row++) {
      for (let col=0; col < block.matrix[row].length; col++) {
        if (block.matrix[row][col] !== ".") { 
          this.grid[this.pos.y + row][this.pos.x + col] = block.matrix[row][col]; 
        }
    }}  
  }

  drop(block) {
    if (this.isFalling) throw new Error("already falling");
    this.block = typeof block === "string" ? Tetromino.oneBlock(block) : block;
    this.isFalling = true;
    this.pos.y = 0;
    this.pos.x = Math.floor((this.grid[0].length - this.block.matrixWidth)/2);
    this.updateBlock(this.block);
  }

  tryMove(move) {
    const { dx, dy } = move;
    if (this.block.width === 3 && dx < 0 && this.pos.x + dx < 0) return;
    if (this.block.width === 2 && dx < 0 && this.pos.x + dx + this.block.width < 1 ) return;
    if (this.pos.x + this.block.matrixWidth + dx > this.width) return;
    if(this.isBlockRight() || this.isBlockLeft()) return;
    if (this.pos.y + dy + this.block.height > this.height || (dy > 0 && this.isBlockBellow())) {
      this.isFalling = false;
      return;
    };
    this.updateBlock(this.block, move);
  }

  tryRotate(tetromino) {
    this.updateBlock(tetromino);
  }

  isBlockBellow() {
    const blockList = ["O","T","X"];
    return Array.from({ length: this.block.width }).some((_,idx) => 
      blockList.includes(this.grid[this.pos.y+this.block.height][this.pos.x+idx]))
  }

  isBlockRight() {
    const blockList = ["O","T","X"];
    return Array.from({ length: this.block.height }).some((_,idx) =>
      blockList.includes(this.grid[this.pos.y+idx][this.block.matrixWidth+this.pos.x]))
  }

  isBlockLeft() {
    const blockList = ["O","X"];
    return Array.from({ length: this.block.height }).some((_, idx) => 
      blockList.includes(this.grid[this.pos.y+idx][this.pos.x]));
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
