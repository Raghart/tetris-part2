import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { shuffleTetrominoes } from "../src/shuffleBag.mjs";
import { expect } from "chai";

describe("shuffleBag can shuffe tetrominoes to improve gameplay experience", () => {
    let board;
    let shuffleBag;
    let T_tetromino;
    let O_tetromino;
    let I_tetromino;

    beforeEach(() => {
        board = new Board(10, 6);
        T_tetromino = Tetromino.T_SHAPE;
        O_tetromino = Tetromino.O_SHAPE;
        I_tetromino = Tetromino.I_SHAPE;
        shuffleBag = shuffleTetrominoes([T_tetromino, O_tetromino, I_tetromino]);
    });

    test.skip("the shuffle bag returns a tetromino", () => {
        board.drop(shuffleBag.next());

        expect(board.toString()).to.not.equalShape(
        `..........
         ..........
         ..........
         ..........
         ..........
         ..........`
        )
    });

    test.skip("the shuffle bag decreases length with each tetromino drawn", () => {
        let randomTetromino = shuffleBag.next();
        expect(randomTetromino).to.exist;

        let secondRandomTetromino = shuffleBag.next();
        expect(secondRandomTetromino).to.exist;

        expect(shuffleBag.length).to.equal(1);
    });

    test.skip("the shuffle bag length decreases witch each next method", () => {
        const _ = shuffleBag.next();
        expect(shuffleBag.length).to.equal(2);
    });

    test.skip("the shuffle bag refills itself if the it's length reaches 0", () => {
        const dummyOne = shuffleBag.next();
        const dummyTwo = shuffleBag.next();
        const dummyThree = shuffleBag.next();
        const dummyToRefill = shuffleBag.next();
        expect(shuffleBag.length).to.equal(2);
    });
});