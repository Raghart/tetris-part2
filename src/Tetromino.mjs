import { IRotate, ORotate } from "./RotateTypes.mjs";
import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    constructor(RotatingShape) {
        this.RotatingShape = RotatingShape;
    }
    static T_SHAPE = RotatingShape.fromString(
    `.T.
     TTT
     ...`);

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