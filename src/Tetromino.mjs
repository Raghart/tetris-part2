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

    rotateRight() { return this.RotatingShape.rotateRight(); };

    rotateLeft() { return this.RotatingShape.rotateLeft(); };

    toString() { return this.RotatingShape.toString(); }

    get matrix() { return this.RotatingShape.matrix; };

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

    moveLeft() { return { dx: 0, dy: -1 }; };

    moveRight() { return { dx: 0, dy: 1 }; };

    moveDown() { return { dx: 1, dy: 0 }; };
};