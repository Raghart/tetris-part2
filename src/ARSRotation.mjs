import { TRotation } from "./RotateTypes.mjs";

export class ARSRotation {
    position;

    constructor(matrix, rotateBehavior = new TRotation) {
        this.matrix = matrix;
        this.rotateBehavior = rotateBehavior;
        this.position = 0;
    };

    rotateRight() {
        this.position = (this.position + 1) % 4;
        return new ARSRotation(this.rotateBehavior.rotateRight(this.position));
    };

    rotateLeft() {
        this.position = (this.position + 2) % 4;
        this.matrix = ARSRotation.T_SHAPES[this.position].matrix;
        return this;
    }
    
    static T_SHAPE = new ARSRotation(TRotation.Shapes[0], new TRotation);

    static fromString(str, rotateBehavior) {
        const rows = str.split("\n").map(row => row.trim().split(""));
        return new ARSRotation(rows, rotateBehavior);
    };

    static TEST = [
            [".",".",".","."],
            ["T","T","T","."],
            [".","T",".","."],
            [".",".",".","."],
    ]

    static I_SHAPE = [
        [
            [".",".",".","."],
            ["I","I","I","I"],
            [".",".",".","."],
            [".",".",".","."],
        ], 
        [
            [".",".","I","."],
            [".",".","I","."],
            [".",".","I","."],
            [".",".","I","."],
        ],
    ]

    static O_SHAPE = [
        [
            [".",".",".","."],
            [".","O","O","."],
            [".","O","O","."],
            [".",".",".","."],
        ]
    ]

    toString() { return this.matrix.map(row => row.join("") + "\n").join(""); }
}