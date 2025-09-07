const trainingRoom = () => {
    const board = [
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
    ];

    const getOffset = (block) => {
        for(let col = 0; col < block.length; col++) {
            let hasBlock = false;
            for (let row = 0; row < block[0].length; row++) {
                if (block[row][col] !== ".") {
                    hasBlock = true;
                    break;
                }
            }

            if(hasBlock) {
                return col;
            }
        }
    }

    const getBlockWidth = (block) => {
        let width = 0;
        for (let col=0; col < block[0].length; col++) {
            if (block.some(row => row[col] !== ".")) { width++ }
        }
        return width;
    }

    const block1 = [
        [".","T",".","."]
        [".","T",".","."],
        ["T","T","T","."],
        [".",".",".","."],
    ];

    const block2 = [
        [".","T",".","."],
        [".","T","T","."],
        [".","T",".","."],
        [".","T",".","."],
    ]

    const block3 = [
        [".","T",".","."],
        [".","T",".","."],
        [".","T",".","."],
        [".","T",".","."],
    ]

    const block4 = [
        [".","T",".","."],
        [".","T",".","."],
        [".","T",".","."],
        [".","T",".","."],
    ]
    
    const testBlock = block4;
    const posX = 8;
    const posY = 0;
    const blockWidth = getBlockWidth(testBlock);
    const blockHeight = testBlock.filter(row => !row.every(cell => cell === ".")).length;  
    const offsetY = testBlock.findIndex(row => !row.every(cell => cell === "."));
    const offsetX = getOffset(testBlock);

    for (let col=0; col < testBlock.length; col++) {
        for (let row=0; row < testBlock[0].length; row++) {
            if (testBlock[col][row] !== ".") {
                board[col + posY][row + posX] = testBlock[col][row];
            }
        }
    }

    for (let i=0; i < blockHeight; i++) {
        if (board[offsetY+posY+i][offsetX + posX-1] === "." ) {
            board[offsetY+posY+i][offsetX + posX-1] = "X"
        }
    };

    for (let i=0; i < blockHeight; i++) {
        if (board[offsetY+posY+i][offsetX + posX + blockWidth] === ".") {
            board[offsetY+posY+i][offsetX + posX + blockWidth] = "X";
        };
    };

    for (let i=0; i < blockWidth; i++) {
        if (board[offsetY+blockHeight][offsetX + posX + i] === ".") {
            board[offsetY+blockHeight][offsetX + posX + i] = "X"
        }
    }

    return board.map(row => row.join("") + "\n").join("");
};

console.log(trainingRoom());