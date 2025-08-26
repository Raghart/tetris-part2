import { reverse } from "lodash";

export class RotatingShape {
    constructor (matrix) {
        this.matrix = matrix;
    }

    static fromString(str) {
        const rows = str.split("\n").map(row => row.trim().split(""));
        return new RotatingShape(rows);
    }

    rotateRight() {
        const rotatedMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) { rotatedMatrix.push(this.matrix.map(row => row[i])); }
        return new RotatingShape(rotatedMatrix.map(row => [...row].reverse()));
    }

    toString() {
        return this.matrix.map(row => row.join("")).join("\n") + "\n"
    }
};