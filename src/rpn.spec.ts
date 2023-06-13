// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { RPN } from "./rpn";
import { BinaryOperator } from "./binary-operator";
import { UnaryOperator } from "./unary-operator";

expect.extend(matchers);

describe("isBinaryOperator", (): void => {
  test("A should return false", (): void => {
    expect(RPN.isBinaryOperator("A")).toEqual(false);
  });
  test("- should return true", (): void => {
    expect(RPN.isBinaryOperator("-")).toEqual(true);
  });
});

describe("isUnaryOperator", (): void => {
  test("test should return false", (): void => {
    expect(RPN.isUnaryOperator("test")).toEqual(false);
  });
  test("NEGATE should return true", (): void => {
    expect(RPN.isUnaryOperator("NEGATE")).toEqual(true);
  });
});

describe("performBinaryOperation", (): void => {
  test("ADDITION, 5, 6 should return 11", (): void => {
    expect(RPN.performBinaryOperation(BinaryOperator.ADDITION, 5, 6)).toEqual(11);
  });
  test("DIVIDE, 2, 6 should return 3", (): void => {
    expect(RPN.performBinaryOperation(BinaryOperator.DIVIDE, 2, 6)).toEqual(3);
  });
  test("MODULO, 4, 10 should return 2", (): void => {
    expect(RPN.performBinaryOperation(BinaryOperator.MODULO, 4, 10)).toEqual(2);
  });
});

describe("performUnaryOperation", (): void => {
  test("NEGATE, 5 should return -1", (): void => {
    expect(RPN.performUnaryOperation(UnaryOperator.NEGATE, 5)).toEqual(-5);
  });
});

describe("rpn", (): void => {
  test("3 3 + should return 6", (): void => {
    expect(RPN.rpn("3 3 +")).toEqual(6);
  });

  test("3 3 5 + + should return 11", (): void => {
    expect(RPN.rpn("3 3 5 + +")).toEqual(11);
  });

  test("10 3 2 - - should return 9", (): void => {
    expect(RPN.rpn("10 3 2 - -")).toEqual(9);
  });

  test("10 3 - 2 - should return 5", (): void => {
    expect(RPN.rpn("10 3 - 2 -")).toEqual(5);
  });

  test("4 3 MOD should return 1", (): void => {
    expect(RPN.rpn("4 3 MOD")).toEqual(1);
  });

  test("3 4 * should return 12", (): void => {
    expect(RPN.rpn("3 4 *")).toEqual(12);
  });

  test("3 -4 + should return -1", (): void => {
    expect(RPN.rpn("3 -4 +")).toEqual(-1);
  });

  test("5 1 2 + 4 * + 3 - should return 14", (): void => {
    expect(RPN.rpn("5 1 2 + 4 * + 3 -")).toEqual(14);
  });

  test("1 NEGATE should return -1", (): void => {
    expect(RPN.rpn("1 NEGATE")).toEqual(-1);
  });

  test("3 4 NEGATE * should return -12", (): void => {
    expect(RPN.rpn("3 4 NEGATE *")).toEqual(-12);
  });

  test("1 0 / should throw exception", (): void => {
    expect(() => RPN.rpn("1 0 /")).toThrowError("Division par zéro");
  });

  test("10 - 3 2 - should throw exception", (): void => {
    expect(() => RPN.rpn("10 - 3 2 -")).toThrowError("Expression invalide");
  });

  test("1 1 1 - / should throw exception", (): void => {
    expect(() => RPN.rpn("1 1 1 - /")).toThrowError("Division par zéro");
  });

  test("NEGATE should throw exception", (): void => {
    expect(() => RPN.rpn("NEGATE")).toThrowError("Expression invalide");
  });

  test("1 2 + + should throw exeption", (): void => {
    expect(() => RPN.rpn("1 2 + +")).toThrowError("Expression invalide");
  });

  test("1 2 & should throw exception", (): void => {
    expect(() => RPN.rpn("1 2 &")).toThrowError("Token invalide");
  });

  test("1 + should throw exception", (): void => {
    expect(() => RPN.rpn("1 +")).toThrowError("Expression invalide");
  });
});
