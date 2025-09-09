import { beforeEach, describe, test } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ScoringSystem } from "../src/ScoringSystem.mjs";
import { repeatMove } from "./MovFallingTetrominoes.test.mjs";
import { expect } from "chai";

describe("Scoring system calculates the score when a line is cleared", () => {
    let board;
    let I_tetromino;
    let O_tetromino;
    let scoringSystem;

    beforeEach(() => {
        board = new Board(7,6);
        I_tetromino = Tetromino.I_SHAPE;
        O_tetromino = Tetromino.O_SHAPE;
        
        scoringSystem = new ScoringSystem();
        board.addScoring(scoringSystem);
    });

    test.skip("directly updates score when notified", () => {
        scoringSystem.calculateScore({ event: "updateScoring", linesCleared: 4 });
        expect(scoringSystem.getScore()).to.be(1200);
    });

    test.skip("it gets a 40 points score when a single line is cleared", () => {
        board.drop(I_tetromino);

        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown(),4));

        expect(scoringSystem.getScore()).to.be(40);
        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ....OO
         ......`
        )
    });

    test.skip("it gets a 100 points score when a two lines are cleared", () => {
        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown(), 4));

        expect(scoringSystem.getScore()).to.be(100);
        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ......
         ......`
        )
    });

    test.skip("it doesn't score when no lines have been cleared", () => {
        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        expect(scoringSystem.getScore()).to.be(0);
        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         IIII..
         IIII..`
        )
    });

    test.skip("it accumulates points across multiple clears", () => {
        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown(), 4));

        expect(scoringSystem.getScore()).to.be(100);

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(I_tetromino);
        repeatMove(() => board.tryMove(I_tetromino.moveLeft()));
        repeatMove(() => board.tryMove(I_tetromino.moveDown()));

        board.drop(O_tetromino);
        repeatMove(() => board.tryMove(O_tetromino.moveRight()));
        repeatMove(() => board.tryMove(O_tetromino.moveDown(), 4));

        expect(scoringSystem.getScore()).to.be(200);

        expect(board.toString()).to.equalShape(
        `......
         ......
         ......
         ......
         ......
         ......`
        )
    });
});