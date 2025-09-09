import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { repeatMove } from "./MovFallingTetrominoes.test.mjs";
import { expect } from "chai";

describe("clearing a line in the board", () => {
    let board;
    let firstTetromino;
    let secondTetromino;
    let thridTetromino;
    
    beforeEach(() => {
        board = new Board(6, 6);
        firstTetromino = Tetromino.O_SHAPE;
        secondTetromino = Tetromino.I_SHAPE;
        thridTetromino = Tetromino.I_SHAPE;
    });

    test("Completing a line in the board clears it", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveLeft()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));

        board.drop(firstTetromino);
        repeatMove(() => board.tryMove(firstTetromino.moveRight()));
        repeatMove(() => board.tryMove(firstTetromino.moveDown(), 5));
        console.log(board.toString());

        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ....OO
         ......`
        );
    });

    test("Completing two lines in the board clears it", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveLeft()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));

        board.drop(thridTetromino);
        repeatMove(() => board.tryMove(thridTetromino.moveLeft()));
        repeatMove(() => board.tryMove(thridTetromino.moveDown()));

        board.drop(firstTetromino);
        repeatMove(() => board.tryMove(firstTetromino.moveRight()));
        repeatMove(() => board.tryMove(firstTetromino.moveDown(), 4));

        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ......
         ......`
        );
    });

    test("Incomplete lines remains in the board", () => {
        board.drop(secondTetromino);
        repeatMove(() => board.tryMove(secondTetromino.moveLeft()));
        repeatMove(() => board.tryMove(secondTetromino.moveDown()));

        board.drop(thridTetromino);
        repeatMove(() => board.tryMove(thridTetromino.moveRight()));
        repeatMove(() => board.tryMove(thridTetromino.moveDown()));

        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ..IIII
         IIII..`
        );
    });
});