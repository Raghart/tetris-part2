import { ARSRotation } from "./ARSRotation.mjs";
import { IRotate, IRotation, ORotate, ORotation, TRotation } from "./RotateTypes.mjs";
import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    constructor(RotatingShape) {
        this.RotatingShape = RotatingShape;
    }

    rotateRight() { return new Tetromino(this.RotatingShape.rotateRight()); };

    rotateLeft() { return new Tetromino(this.RotatingShape.rotateLeft()); };

    toString() { return this.RotatingShape.toString(); }

    get matrix() { return this.RotatingShape.matrix; };

    get height() { return this.RotatingShape.matrix.filter(row => !row.every(cell => cell === ".")).length };

    get width() { 
        let width = 0;
        for (let col=0; col < this.RotatingShape.matrix[0].length; col++) {
            if (this.RotatingShape.matrix.some(row => row[col] !== ".")) { width++; }
        }
        return width;
    };
    get matrixWidth() { return this.RotatingShape.matrix[0].length };

    get offsetY () { return this.RotatingShape.matrix.findIndex(row => !row.every(cell => cell === ".")); };

    get offsetX () {
        for(let col=0; col < this.RotatingShape.matrix.length; col++) {
            let hasBlock = false;
            for (let row=0; row < this.RotatingShape.matrix[0].length; row++) {
                if (this.RotatingShape.matrix[row][col] !== ".") { 
                    hasBlock = true; 
                    break; 
                }
            }
            if (hasBlock) return col;
        }
     }
    static T_SHAPE = new Tetromino(new ARSRotation(TRotation.Shapes[0]));

    static I_SHAPE = new Tetromino(new ARSRotation(IRotation.Shapes[0], new IRotation));

    static O_SHAPE = new Tetromino(new ARSRotation(ORotation.Shapes[0], new ORotation));

    static oneBlock(str) { return new Tetromino(RotatingShape.fromString(str, new ORotate)) };

    moveLeft() { return { dx: -1, dy: 0 }; };

    moveRight() { return { dx: 1, dy: 0 }; };

    moveDown() { return { dx: 0, dy: 1 }; };

    moveUp() { return { dx: 0, dy: -1 } };
};