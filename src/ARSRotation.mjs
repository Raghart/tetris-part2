import { IRotation, ORotation, TRotation } from "./RotateTypes.mjs";

export class ARSRotation {
    constructor(matrix, rotateBehavior = new TRotation) {
        this.matrix = matrix;
        this.rotateBehavior = rotateBehavior;
        this.position = 0;
    };

    rotateRight() {
        this.position = (this.position + 1) % this.rotateBehavior.totalShapes;
        return new ARSRotation(this.matrix = this.rotateBehavior.rotate(this.position), this.rotateBehavior);
    }

    rotateLeft() {
        this.position = (this.position + 2) % this.rotateBehavior.totalShapes;
        return new ARSRotation(this.matrix = this.rotateBehavior.rotate(this.position), this.rotateBehavior);
    }

    static I_SHAPE = new ARSRotation(IRotation.Shapes[0], new IRotation);

    static O_SHAPE = new ARSRotation(ORotation.Shapes[0], new ORotation);

    static fromString(str, rotateBehavior) {
        const rows = str.split("\n").map(row => row.trim().split(""));
        return new ARSRotation(rows, rotateBehavior);
    };

    toString() { return this.matrix.map(row => row.join("") + "\n").join(""); }
}