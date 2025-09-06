export class TRotation {
    rotateRight () {
        
    }
    static Shapes = [[[".",".",".","."],["T","T","T","."],[".","T",".","."],[".",".",".","."]],
                     [[".","T",".","."],[".","T","T","."],[".","T",".","."],[".",".",".","."]]
            ]
};

export class NormalRotate {
    rotateRight(matrix) {
        const rotatedMatrix = [];
        for (let i=0; i < matrix.length; i++) { rotatedMatrix.push(matrix.map(row => row[i])); }
        return rotatedMatrix.map(row => [...row].reverse());
    };

    rotateLeft(matrix) {
        const rotatedMatrix = [];
        for (let i = matrix.length - 1; i >= 0; i--) { rotatedMatrix.push(matrix.map(row => row[i]))};
        return rotatedMatrix;
    };
};

export class IRotate {
    rotateRight(matrix) {
        const rotatedMatrix = [];
        for (let i = 0; i < matrix.length; i++) { rotatedMatrix.push(matrix.map(row => row[i]))}
        return rotatedMatrix;
    };

    rotateLeft(matrix) {
        return this.rotateRight(matrix);
    }
};

export class ORotate {
    rotateRight(matrix) { return matrix; }
    rotateLeft(matrix) { return matrix };
};