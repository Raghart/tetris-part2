export class RotateNormal {
    rotateRight(matrix) {
        const rotatedMatrix = [];
        for (let i=0; i < matrix.length; i++) { rotatedMatrix.push(matrix.map(row => row[i])); }
        const testList = rotatedMatrix.map(row => [...row].reverse());
        return testList;
    };

    rotateLeft(matrix) {
        const rotatedMatrix = [];
        for (let i = matrix.length - 1; i >= 0; i--) { rotatedMatrix.push(matrix.map(row => row[i]))};
        return rotatedMatrix;
    };
}