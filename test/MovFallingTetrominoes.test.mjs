import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";

export const repeatMove = (moveDirection, times = 10) => {
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
        `..TTT.....
         ...T......
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
        `....TTT...
         .....T....
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
         ...TTT....
         ....T.....
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
        `TTT.......
         .T........
         ..........
         ..........` 
        )
    });

    test("It can't be moved right beyond the board", () => {
        repeatMove(() => board.tryMove(tetromino.moveRight()));
        expect(board.toString()).to.equalShape(
        `.......TTT
         ........T.
         ..........
         ..........` 
        )
    });

    test("It can't be moved down beyond the board (will stop falling)", () => {
        repeatMove(() => board.tryMove(tetromino.moveDown()));
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ...TTT....
         ....T.....` 
        )
    });
});

describe("Tetrominoes can't go through other blocks in any direction", () => {
    let board;
    let O_tetromino;

    beforeEach(() => {
        board = new Board(10, 4);
        O_tetromino = Tetromino.O_SHAPE;
        board.drop(O_tetromino);
    });

    test("It can't be moved down through other blocks (will stop falling)", () => {
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(O_tetromino)
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        expect(board.toString()).to.equalShape(
        `....OO....
         ....OO....
         ....OO....
         ....OO....` 
        )
    });

    test("It can't be moved left through other blocks", () => {
        repeatMove(() => board.tryMove(O_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(O_tetromino)
        repeatMove(() => board.tryMove(O_tetromino.moveLeft()));
        
        expect(board.toString()).to.equalShape(
        `OOOO......
         OOOO......
         OO........
         OO........` 
        )
    });

    test("It can't be moved right through other blocks", () => {
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        
        expect(board.toString()).to.equalShape(
        `......OOOO
         ......OOOO
         ........OO
         ........OO` 
        )
    });
});