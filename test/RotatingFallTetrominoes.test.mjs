import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";
import { repeatMove } from "./MovFallingTetrominoes.test.mjs";

describe("A falling tetromino can be rotated", () => {
    let board;
    let tetromino;

    beforeEach(() => {
        board = new Board(10,4);
        tetromino = Tetromino.T_SHAPE;
    });

    test("A falling tetromino can be rotated to the right in the board", () => {
        board.drop(tetromino);
        board.tryRotate(tetromino.rotateRight());
        expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........`
        );
    });

    test("A falling tetromino can be rotated to the left in the board", () => {
        board.drop(tetromino);
        board.tryRotate(tetromino.rotateLeft());
        
        expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........`
        );
    });
});

describe("A falling tetromino can Wall Kick to rotate if possible", () => {
    let board;
    let T_tetromino;
    let O_tetromino;

    beforeEach(() => {
        board = new Board(10,5);
        T_tetromino = Tetromino.T_SHAPE;
        O_tetromino = Tetromino.O_SHAPE;
    });

    test("A falling tetromino can wall kick if it wants to rotate in the left wall", () => {
        board.drop(T_tetromino);
        board.tryRotate(T_tetromino = T_tetromino.rotateRight());
        repeatMove(() => board.tryMove(T_tetromino.moveLeft()));
        
        board.tryRotate(T_tetromino = T_tetromino.rotateRight());
        expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........`
        );
    });

    test("A falling tetromino can wall kick if it wants to rotate in the right wall", () => {
        board.drop(T_tetromino);
        board.tryRotate(T_tetromino = T_tetromino.rotateLeft());
        
        repeatMove(() => board.tryMove(T_tetromino.moveRight()));
        board.tryRotate(T_tetromino = T_tetromino.rotateLeft());
        expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........`
        );
    });

    test("A falling tetromino can wall kick if it wants to rotate at the bottom wall", () => {
        board.drop(T_tetromino);
        repeatMove(() => board.tryMove(T_tetromino.moveDown()),3);
        
        board.tryRotate(T_tetromino.rotateRight());
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ....TT....
         ....T.....`
        );
    });

    test("A falling tetromino can wall kick to a block if it wants to rotate in the left side", () => {
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(T_tetromino);
        board.tryRotate(T_tetromino = T_tetromino.rotateRight());
        board.tryMove(T_tetromino.moveDown());
        repeatMove(() => board.tryMove(T_tetromino.moveLeft()));
        board.tryRotate(T_tetromino = T_tetromino.rotateRight());
        
        expect(board.toString()).to.equalShape(
        `..........
         ..T.......
         .TTT......
         OO........
         OO........`
        );
    });

    test("A falling tetromino can wall kick to a block if it wants to rotate in the right side", () => {
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(T_tetromino);
        board.tryRotate(T_tetromino = T_tetromino.rotateLeft());
        board.tryMove(T_tetromino.moveDown());
        
        repeatMove(() => board.tryMove(T_tetromino.moveRight()));
        board.tryRotate(T_tetromino = T_tetromino.rotateLeft());
        expect(board.toString()).to.equalShape(
        `..........
         .......T..
         ......TTT.
         ........OO
         ........OO`
        );
    });

    test("A falling tetromino can wall kick againts a block at the bottom", () => {
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(T_tetromino);
        board.tryMove(T_tetromino.moveDown());
        board.tryMove(T_tetromino.moveDown());
        board.tryRotate(T_tetromino.rotateRight());
        expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ....OO....
         ....OO....`
        );
    });
});

describe("It cannot be rotated when there is no room to rotate", () => {
    let board;
    let T_tetromino;
    let O_tetromino;

    beforeEach(() => {
        board = new Board(6,5);
        T_tetromino = Tetromino.T_SHAPE;
        O_tetromino = Tetromino.O_SHAPE;
    });

    test("A falling tetromino can't rotate if it doesn't have space to rotate", () => {
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown()));
        
        board.drop(T_tetromino);
        board.tryRotate(T_tetromino = T_tetromino.rotateRight());
        board.tryMove(T_tetromino.moveDown());
        board.tryMove(T_tetromino.moveDown());
        
        board.tryRotate(T_tetromino = T_tetromino.rotateLeft())
        expect(board.toString()).to.equalShape(
        `......
         ......
         ..T...
         OOTTOO
         OOT.OO`
        );
    });
});