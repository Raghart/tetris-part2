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
    if (dx < 0 && this.isLeftFull()) return;
    if (dx > 0 && this.isRightFull()) return;
    if (dy > 0 && this.isBellowFull()) {
      this.isFalling = false;
      return;
    }
    this.updateBlock(this.block, move);
  }

  tryRotate(tetromino) {
    if (this.isLeftFull()) {
      if (this.isRightFull()) return;
      this.tryMove(tetromino.moveRight());
      this.updateBlock(tetromino);
      this.tryMove(tetromino.moveLeft());
      return;
    };

    if (this.isRightFull()) {
      if (this.isLeftFull()) return;
      this.tryMove(tetromino.moveLeft());
      this.updateBlock(tetromino);
      this.tryMove(tetromino.moveRight());
      return;
    }

    if (this.isBellowFull()) {
      this.tryMove(tetromino.moveUp());
      this.updateBlock(tetromino);
      this.tryMove(tetromino.moveDown());
    };
    this.updateBlock(tetromino);
  }

  isLeftFull() {
    for(let col = 0; col < this.block.height; col++) {
      if (this.grid[this.pos.y + this.block.offsetY + col][this.pos.x + this.block.offsetX - 1] !== ".") {
        return true;
      }
    }
    return false;
  };

  isRightFull() {
    for (let col = 0; col < this.block.height ; col++ ) {
      if (this.grid[this.pos.y+this.block.offsetY+col][this.pos.x + this.block.offsetX + this.block.width] !== ".") {
        return true;
      }
    }
    return false;
  }

  isBellowFull() {
    for(let row = 0; row < this.block.width; row++) {
      if (this.grid[this.pos.y+this.block.offsetY+this.block.height]?.[this.pos.x+this.block.offsetX+row] !== ".") {
        return true;
      }
    }
    return false;
  }

  isBlockBellow() {
    const blockList = ["O","T","X"];
    return Array.from({ length: this.block.width }).some((_,idx) => 
      blockList.includes(this.grid[this.pos.y+this.block.height][this.pos.x+idx]))
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
