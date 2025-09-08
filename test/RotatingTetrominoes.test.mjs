import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("Rotating a T Tetromino using ARS Rotation System", () => {
  let shape;
  
  beforeEach(() => {
    shape = Tetromino.T_SHAPE;
  });

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..
       ....`
    )
  });

  test("the T shape can rotate to the right", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    )
  });

  test("the T shape can rotate to the left", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    )
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("Rotating a I Tetromino using ARS Rotation System", () => {
  let shape;
  
  beforeEach(() => {
    shape = Tetromino.I_SHAPE;
  });

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    )
  });

  test("the I shape can rotate to the right", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    )
  });

  test("the I shape can rotate to the left", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    )
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("Rotating a O Tetromino using ARS Rotation System", () => {
  let shape;
  
  beforeEach(() => {
    shape = Tetromino.O_SHAPE;
  });

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    )
  });

  test("the O shape can't rotate to the right", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    )
  });

  test("the O shape can't rotate to the left", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    )
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});
