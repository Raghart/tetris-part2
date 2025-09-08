import { IRotation, ORotation, TRotation } from "./RotateTypes.mjs";

export class ARSRotation {
    constructor(matrix, rotateBehavior = new TRotation, position = 0) {
        this.matrix = matrix.map(row => [...row]);
        this.rotateBehavior = rotateBehavior;
        this.position = position;
    };

    rotateRight() {
        const newPosition = (this.position + 1) % this.rotateBehavior.totalShapes;
        const newMatrix = this.rotateBehavior.rotate(newPosition);
        return new ARSRotation(newMatrix, this.rotateBehavior, newPosition);
    }

    rotateLeft() {
        const newPosition = (this.position + 3) % this.rotateBehavior.totalShapes;
        const newMatrix = this.rotateBehavior.rotate(newPosition);
        return new ARSRotation(newMatrix, this.rotateBehavior, newPosition);
    }

    static I_SHAPE = new ARSRotation(IRotation.Shapes[0], new IRotation);

    static fromString(str, rotateBehavior) {
        const rows = str.split("\n").map(row => row.trim().split(""));
        return new ARSRotation(rows, rotateBehavior);
    };

    toString() { return this.matrix.map(row => row.join("") + "\n").join(""); }
}