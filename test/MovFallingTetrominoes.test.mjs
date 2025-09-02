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

    test("a falling tetromino can be moved left", () => {
        board.drop(tetromino);
        board.tryMove(tetromino.moveLeft());
        expect(board.toString()).to.equalShape(
        `...T......
         ..TTT.....
         ..........
         ..........
         ..........
         ..........`
        );
    });

    test("a falling tetromino can be moved right", () => {
        board.drop(tetromino);
        board.tryMove(tetromino.moveRight());
        expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
         ..........
         ..........
         ..........
         ..........`
        );
    });

    test("a falling tetromino can be moved down", () => {
        board.drop(tetromino);
        board.tryMove(tetromino.moveDown());
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

describe("Tetrominoes can't go beyond the board", () => {
    let board;
    let tetromino;

    beforeEach(() => {
        board = new Board(10,4);
        tetromino = Tetromino.T_SHAPE;
        board.drop(tetromino);
    });

    test("It can't be moved left beyond the board", () => {
        repeatMove(() => board.tryMove(tetromino.moveLeft()));
        expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........` 
        )
    });

    test("It can't be moved right beyond the board", () => {
        repeatMove(() => board.tryMove(tetromino.moveRight()));
        expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........` 
        )
    });

    test("It can't be moved down beyond the board (will stop falling)", () => {
        repeatMove(() => board.tryMove(tetromino.moveDown()));
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....` 
        )
    });
});

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

    test("It can't be moved down through other blocks (will stop falling)", () => {
        repeatMove(() => board.tryMove(firstTetromino.moveDown()));
        
        board.drop(secondTetromino)
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));

        expect(board.toString()).to.equalShape(
        `....OO....
         ....OO....
         ....OO....
         ....OO....` 
        )
    });

    test("It can't be moved left through other blocks", () => {
        console.log(board.toString());
        repeatMove(() => board.tryMove(firstTetromino.moveLeft()));
        console.log(board.toString());
        repeatMove(() => board.tryMove(firstTetromino.moveDown()));
        console.log(board.toString());
        
        board.drop(secondTetromino);
        console.log(board.toString());
        repeatMove(() => board.tryMove(secondTetromino.moveLeft()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));
        console.log(board.toString());

        board.drop(thirdTetromino)
        console.log(board.toString());
        repeatMove(() => board.tryMove(thirdTetromino.moveLeft()));
        console.log(board.toString());

        expect(board.toString()).to.equalShape(
        `OOOO......
         OOOO......
         OO........
         OO........` 
        )
    });

    test("It can't be moved right through other blocks", () => {
        repeatMove(() => board.tryMove(firstTetromino.moveRight()));
        repeatMove(() => board.tryMove(firstTetromino.moveDown()));
        
        board.drop(secondTetromino)
        repeatMove(() => board.tryMove(secondTetromino.moveRight()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));

        board.drop(thirdTetromino)
        repeatMove(() => board.tryMove(thirdTetromino.moveRight()));
        
        expect(board.toString()).to.equalShape(
        `......OOOO
         ......OOOO
         ........OO
         ........OO` 
        )
    });
});