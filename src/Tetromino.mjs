import { IRotate, ORotate } from "./RotateTypes.mjs";
import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    constructor(RotatingShape) {
        this.RotatingShape = RotatingShape;
    }
    static T_SHAPE = new Tetromino(RotatingShape.fromString(
    `.T.
     TTT
     ...`));

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

    get offsetY () { return this.RotatingShape.matrix.findIndex(row => row.some(cell => cell === ".")); };

    static I_SHAPE = new Tetromino(RotatingShape.fromString(
    `.....
     .....
     IIII.
     .....
     .....`, new IRotate
    ));

    static O_SHAPE = new Tetromino(RotatingShape.fromString(
    `.OO
     .OO
     ...`, new ORotate
    ));

    static oneBlock(str) { return new Tetromino(RotatingShape.fromString(str, new ORotate)) };

    moveLeft() { return { dx: -1, dy: 0 }; };

    moveRight() { return { dx: 1, dy: 0 }; };

    moveDown() { return { dx: 0, dy: 1 }; };
};