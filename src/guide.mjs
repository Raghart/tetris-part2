for (let i=0; i < 2; i++) {
        if(board[posY+i][-1+postX] === "O") {
            return true
        }
    }