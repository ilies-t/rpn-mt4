import { UnaryOperator } from "./unary-operator";
import { BinaryOperator } from "./binary-operator";

/**
 * Reverse Polish notation.
 */
export class RPN {
  /**
   * Check that token is a binary operator.
   * @param token Given token.
   */
  public static isBinaryOperator(token: string): token is BinaryOperator {
    return Object.values(BinaryOperator).includes(token as BinaryOperator);
  }

  /**
   * Check that token is a unary operator.
   * @param token Given token.
   */
  public static isUnaryOperator(token: string): token is UnaryOperator {
    return Object.values(UnaryOperator).includes(token as UnaryOperator);
  }

  /**
   * Perform binary operation.<br/>
   * Example: `b - a = x` --> `5 - 1 = 4`
   * @param operator Operator type.
   * @param a Number A to perform operation.
   * @param b Number B to perform operation.
   */
  public static performBinaryOperation(operator: BinaryOperator, a: number, b: number): number {
    switch (operator) {
      case BinaryOperator.ADDITION:
        return b + a;
      case BinaryOperator.SUBTRACTION:
        return b - a;
      case BinaryOperator.MULTIPLICATION:
        return b * a;
      case BinaryOperator.DIVIDE:
        // gestion du cas de division par zéro
        if (a === 0) {
          throw new Error("Division par zéro");
        }
        return b / a;
      case BinaryOperator.MODULO:
        return b % a;
    }
  }

  /**
   * Perform unary operation.<br/>
   * Example: `a (NEGATE) = -a` --> `5 (NEGATE) = -5`
   * @param operator Operator type.
   * @param a Number to perform operation.
   */
  public static performUnaryOperation(operator: UnaryOperator, a: number): number {
    if (operator === UnaryOperator.NEGATE) {
      return -a;
    }
  }

  /**
   * Do a Reverse Polish Notation.
   * @param expression Given expression as string.
   */
  public static rpn(expression: string): number {
    // séparation de tous les elements de l'expression
    const tokens: string[] = expression.split(" ");
    // utilisation d'une liste pour stocker les nombres u par un
    const stack: number[] = [];

    // pour chaque token dans 'tokens'
    tokens.forEach((token: string): void => {
      const num: number = parseFloat(token);

      // si le token est un nombre, on le pousse dans la liste
      if (!isNaN(num)) {
        stack.push(num);
      } else if (RPN.isBinaryOperator(token)) {
        // si le token est un opérateur binary, on vérifie qu'il-y au moins deux éléments à calculer dans la liste
        if (stack.length < 2) {
          throw new Error("Expression invalide");
        }
        const a: number = stack.pop();
        const b: number = stack.pop();
        stack.push(RPN.performBinaryOperation(token, a, b));
      } else if (RPN.isUnaryOperator(token)) {
        // si le token est un opérateur unaire, on vérifie qu'il y a au moins un élément dans la liste
        if (stack.length < 1) {
          throw new Error("Expression invalide");
        }
        const a: number = stack.pop();
        stack.push(RPN.performUnaryOperation(token, a));
      } else {
        // si le token n'est ni un nombre, ni un opérateur binaire, ni un opérateur unaire, on lance une erreur
        throw new Error("Token invalide");
      }
    });

    // retourne le résultat final
    return stack.pop();
  }
}
