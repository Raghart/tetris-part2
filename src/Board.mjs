export class Board {
  width;
  height;
  grid; 
  pos;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: width }, () => Array.from({ length: height }, () => "."));
    this.pos = { x: 0, y: Math.floor(this.width / 2) };
  }

  tick() { 
    this.grid = this.grid.map(arr => arr.map(() => "."));
    this.grid[++this.pos.x][this.pos.y] = "X"
  }

  drop() { this.grid[this.pos.x][this.pos.y] = "X" }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
