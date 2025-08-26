export class RotatingShape {
    constructor (matrix) {
        this.matrix = matrix;
    }

    static fromString(str) {
        const rows = str.split("\n").map(row => row.trim().split(""));
        return new RotatingShape(rows);
    }

    toString() {
        return this.matrix.map(row => row.join("")).join("\n") + "\n"
    }
};