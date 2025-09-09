import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { repeatMove } from "./MovFallingTetrominoes.test.mjs";
import { expect } from "chai";

describe("clearing a line in the board", () => {
    let board;
    let O_tetromino;
    let I_tetromino;
    
    beforeEach(() => {
        board = new Board(6, 6);
        O_tetromino = Tetromino.O_SHAPE;
        I_tetromino = Tetromino.I_SHAPE;
    });

    test("Completing a line in the board clears it", () => {
        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown(), 5));
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
        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown(), 4));

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
        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveRight()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

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