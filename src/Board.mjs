export class Board {
  width;
  height;
  grid; 
  pos;
  block;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: width }, () => Array.from({ length: height }, () => "."));
    this.pos = { x: 0, y: Math.floor(this.width / 2) };
    this.block = "";
    this.falling = true; 
  }

  tick() {
    if (this.falling) {
      this.grid = this.grid.map(arr => arr.map(() => "."));
      this.grid[++this.pos.x][this.pos.y] = this.block;
    }
  }

  drop(block) {
    if (this.block && this.block !== block) throw new Error("already falling");
    this.block = block;
    this.grid[this.pos.x][this.pos.y] = block;
  }

  hasFalling() {
    if (this.pos.y === this.height) { 
      this.block = ""; return this.falling = false;
    }; return this.falling = true;
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
