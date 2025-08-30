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

    static I_SHAPE = RotatingShape.fromString(
    `.....
     .....
     IIII.
     .....
     .....`, new IRotate
    );

    static O_SHAPE = RotatingShape.fromString(
    `.OO
     .OO
     ...`, new ORotate
    );

    static oneBlock(str) { return RotatingShape.fromString(str, new ORotate) };

    moveLeft() {
        
    }
};