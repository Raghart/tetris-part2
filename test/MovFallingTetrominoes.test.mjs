import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";

const repeatMove = (moveDirection, times = 10) => {
    for (let i=0; i < times; i++) {
        moveDirection();
    }
};

describe("Moving Falling Tetrominoes", () => {
    let board;
    let tetromino;

    beforeEach(() => {
        board = new Board(10, 6);
        tetromino = Tetromino.T_SHAPE;
    });

    test.skip("a falling tetromino can be moved left", () => {
        board.drop(tetromino);
        tetromino.moveLeft();
        expect(board.toString()).to.equalShape(
        `...T......
         ..TTT.....
         ..........
         ..........
         ..........
         ..........`
        );
    });

    test.skip("a falling tetromino can be moved right", () => {
        board.drop(tetromino);
        tetromino.moveRight();
        expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
         ..........
         ..........
         ..........
         ..........`
        );
    });

    test.skip("a falling tetromino can be moved down", () => {
        board.drop(tetromino);
        tetromino.moveDown();
        expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
        )
    });
});
/*
describe("Tetrominoes can't go beyond the board", () => {
    let board;
    let tetromino;

    beforeEach(() => {
        board = new Board(10,4);
        tetromino = Tetromino.T_SHAPE;
        board.drop(tetromino);
    });

    test.skip("It can't be moved left beyond the board", () => {
        repeatMove(() => tetromino.moveLeft());
        expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........` 
        )
    });

    test.skip("It can't be moved right beyond the board", () => {
        repeatMove(() => tetromino.moveRight());
        expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........` 
        )
    });

    test.skip("It can't be moved down beyond the board (will stop falling)", () => {
        repeatMove(() => tetromino.moveDown());
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....` 
        )
    });
});
*/
/*
describe("Tetrominoes can't go through other blocks in any direction", () => {
    let board;
    let firstTetromino;
    let secondTetromino;
    let thirdTetromino;

    beforeEach(() => {
        board = new Board(10, 4);
        firstTetromino = Tetromino.O_SHAPE;
        secondTetromino = Tetromino.O_SHAPE;
        thirdTetromino = Tetromino.O_SHAPE;
        board.drop(firstTetromino);
    });

    test.skip("It can't be moved down through other blocks (will stop falling)", () => {
        repeatMove(() => firstTetromino.moveDown());
        
        board.drop(secondTetromino)
        repeatMove(() => secondTetromino.moveDown());

        expect(board.toString()).to.equalShape(
        `....OO....
         ....OO....
         ....OO....
         ....OO....` 
        )
    });

    test.skip("It can't be moved left through other blocks", () => {
        repeatMove(() => firstTetromino.moveLeft());
        repeatMove(() => firstTetromino.moveDown());
        
        board.drop(secondTetromino)
        repeatMove(() => secondTetromino.moveLeft());
        repeatMove(() => secondTetromino.moveDown());

        board.drop(thirdTetromino)
        repeatMove(() => thirdTetromino.moveLeft());

        expect(board.toString()).to.equalShape(
        `OOOO......
         OOOO......
         OO........
         OO........` 
        )
    });

    test.skip("It can't be moved right through other blocks", () => {
        repeatMove(() => firstTetromino.moveRight());
        repeatMove(() => firstTetromino.moveDown());
        
        board.drop(secondTetromino)
        repeatMove(() => secondTetromino.moveRight());
        repeatMove(() => secondTetromino.moveDown());

        board.drop(thirdTetromino)
        repeatMove(() => thirdTetromino.moveRight());

        expect(board.toString()).to.equalShape(
        `......OOOO
         ......OOOO
         ........OO
         ........OO` 
        )
    });
});
*/