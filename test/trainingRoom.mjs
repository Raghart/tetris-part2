const trainingRoom = () => {
    const board = [
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".",".",".",".",],
        [".",".",".",".",".",".",".","T",".",".",],
        [".",".",".",".",".",".","T","T","O","O",],
        ["I","I","I","I","I","I","I","T","O","O",],
    ];

    for (let i=0; i < board.length ;i++) {
        if (board.some(row => row.every(cell => cell !== "."))) {
            const fullIdx = board.findIndex(row => row.every(cell => cell !== "."));
            board[fullIdx].fill(".");
        } else {
            break;
        }
    }

    return board.map(row => row.join("") + "\n").join("");

    /*
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
        [".",".",".","."],
        ["T","T","T","."],
        [".","T",".","."],
        [".",".",".","."]
    ];

    const block2 = [
        [".","T",".","."],
        [".","T","T","."],
        [".","T",".","."],
        [".",".",".","."]
    ]

    const block3 = [
        [".",".",".","."],
        [".","T",".","."],
        ["T","T","T","."],
        [".",".",".","."]
    ]

    const block4 = [
        [".","T",".","."],
        ["T","T",".","."],
        [".","T",".","."],
        [".",".",".","."],
    ]
    
    
    const testBlock = block2;
    const posX = 3;
    const posY = 0;
    const blockWidth = getBlockWidth(testBlock);
    const blockHeight = testBlock.filter(row => !row.every(cell => cell === ".")).length;  
    const offsetY = testBlock.findIndex(row => !row.every(cell => cell === "."));
    const offsetX = getOffset(testBlock);

    for (let col=offsetY; col < testBlock.length; col++) {
        for (let row=0; row < testBlock[0].length; row++) {
            if (testBlock[col][row] !== ".") {
                board[col + posY - offsetY][row + posX] = testBlock[col][row];
            }
        }
    }
    
    for (let i=0; i < blockHeight; i++) {
        if (board[posY+i][offsetX + posX-1] === "." ) {
            board[posY+i][offsetX + posX-1] = "X"
        }
    };

    for (let i=0; i < blockHeight; i++) {
        if (board[posY+i][offsetX + posX + blockWidth] === ".") {
            board[posY+i][offsetX + posX + blockWidth] = "X";
        };
    };

    for (let i=0; i < blockWidth; i++) {
        if (board[blockHeight][offsetX + posX + i] === ".") {
            board[blockHeight][offsetX + posX + i] = "X"
        }
    }
        */
};

console.log(trainingRoom());