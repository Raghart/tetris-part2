export class Board {
  width;
  height;
  grid; 
  pos;
  block;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: width }, () => Array.from({ length: height }, () => "."));
    this.pos = { x: 0, y: Math.floor(this.width / 2) };
    this.block = "";
  }

  tick() {
    if (!this.hasFalling()) return;
    const currentX = this.pos.x
    const nextX = ++this.pos.x;

    if (nextX >= this.height) return;
    this.grid[currentX][this.pos.y] = ".";
    this.grid[nextX][this.pos.y] = this.block;
  }

  hasFalling() {
    return this.pos.x !== this.height;
  }

  drop(block) {
    const hasBlock = this.grid.slice(0,-1).some(row => row.includes(this.block));
    if (hasBlock) throw new Error("already falling");
    this.block = block;
    this.grid[this.pos.x = 0][this.pos.y] = block;
  }

  toString() { return this.grid.map(row => row.join("") + "\n").join(""); }
}
