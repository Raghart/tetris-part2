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
        board.updateBlock(tetromino.rotateRight());
        
        expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........`
        );
    });

    test("A falling tetromino can be rotated to the left in the board", () => {
        board.drop(tetromino);
        board.updateBlock(tetromino.rotateLeft());
        
        expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........`
        );
    });
});

describe("A falling tetromino can Wall Kick to be able to rotate if possible", () => {
    let board;
    let tetromino;
    let secondTetromino;

    beforeEach(() => {
        board = new Board(10,5);
        tetromino = Tetromino.T_SHAPE;
        secondTetromino = Tetromino.O_SHAPE;
    });

    test.skip("A falling tetromino can wall kick if it wants to rotate in the left wall", () => {
        board.drop(tetromino);
        console.log(board.toString());
        board.updateBlock(tetromino.rotateRight());
        console.log(board.toString());
        repeatMove(() => board.tryMove(tetromino.moveLeft()));
        console.log(board.toString());
        board.updateBlock(tetromino.rotateRight());
        console.log(board.toString());

        expect(board.toString()).to.equalShape(
        `..........
         TTT.......
         .T........
         ..........
         ..........`
        );
    });

    test.skip("A falling tetromino can wall kick if it wants to rotate in the right wall", () => {
        board.drop(tetromino);
        repeatMove(() => board.tryMove(tetromino.moveRight()));
        board.updateBlock(tetromino.rotateLeft());
        expect(board.toString()).to.equalShape(
        `..........
         .......TTT
         ........T.
         ..........
         ..........`
        );
    });

    test.skip("A falling tetromino can wall kick if it wants to rotate at the bottom wall", () => {
        board.drop(tetromino);
        repeatMove(() => board.tryMove(tetromino.moveDown()),3);

        board.updateBlock(tetromino.rotateRight());
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ....TT....
         ....T.....`
        );
    });

    test.skip("A falling tetromino can wall kick to a block if it wants to rotate in the left side", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveLeft()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));
        
        board.drop(tetromino);
        board.updateBlock(tetromino.rotateRight());
        board.tryMove(tetromino.moveDown());
        repeatMove(() => board.tryMove(tetromino.moveLeft()));
        board.updateBlock(tetromino.rotateRight());
        
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         .TTT......
         OOT.......
         OO........`
        );
    });

    test.skip("A falling tetromino can wall kick to a block if it wants to rotate in the right side", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveRight()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));
        
        board.drop(tetromino);
        board.updateBlock(tetromino.rotateLeft());
        repeatMove(() => board.tryMove(tetromino.moveRight()));
        board.updateBlock(tetromino.rotateLeft());
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ......TTT.
         .......TOO
         ........OO`
        );
    });

    test.skip("A falling tetromino can wall kick againts a block at the bottom", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));
        
        board.drop(tetromino);
        board.tryMove(tetromino.moveDown());
        board.tryMove(tetromino.moveDown());
        board.updateBlock(tetromino.rotateRight());
        expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ....OO....
         ....OO....`
        );
    });
});
/*
describe("It cannot be rotated when there is no room to rotate", () => {
    let board;
    let tetromino;
    let secondTetromino;
    let thirdTetromino;

    beforeEach(() => {
        board = new Board(6,4);
        tetromino = Tetromino.T_SHAPE;
        secondTetromino = Tetromino.O_SHAPE;
        thirdTetromino = Tetromino.O_SHAPE;
    });

    test.skip("A falling tetromino can't rotate if it doesn't have space to rotate", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveRight()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));

        board.drop(thirdTetromino);
        repeatMove(() => board.tryMove(thirdTetromino.moveLeft()));
        repeatMove(() => board.tryMove(thirdTetromino.moveDown()));

        board.drop(tetromino);
        board.updateBlock(tetromino.rotateRight());
        board.tryMove(board.moveDown());
        board.updateBlock(tetromino.rotateLeft())
        
        expect(board.toString()).to.equalShape(
        `......
         ..T..
         OOTTOO
         OOT.OO`
        );
    });
});
*/