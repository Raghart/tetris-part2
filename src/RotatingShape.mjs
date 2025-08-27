import { NormalRotate } from "./RotateTypes.mjs";

export class RotatingShape {
    constructor (matrix, rotateBehavior = new NormalRotate) {
        this.matrix = matrix;
        this.rotateBehavior = rotateBehavior;
    }

    static fromString(str, rotateBehavior) {
        const rows = str.split("\n").map(row => row.trim().split(""));
        return new RotatingShape(rows);
    }

    rotateRight() {
        return new RotatingShape(this.rotateBehavior.rotateRight(this.matrix));
    }

    rotateLeft() {
        return new RotatingShape(this.rotateBehavior.rotateLeft(this.matrix));
    }

    toString() {
        return this.matrix.map(row => row.join("")).join("\n") + "\n";
    }
};