import { } from "jest";

import { codegen, convertToString } from "../src/codegen";
import JavaScriptNode from "../src/js/JavaScriptNode";
import Lexer from "../src/Lexer";
import Parser from "../src/Parser";
import replEnv from "../src/replEnv";
import toString from "../src/toString";
import SquirrelType from "../src/types/SquirrelType";

interface IPositiveTestCase {
  input: string;
  expectedOutput: any;
}

// tslint:disable:object-literal-sort-keys
const positiveTestCases: IPositiveTestCase[] = [
  { input: "1", expectedOutput: 1 },
  { input: "-1", expectedOutput: -1 },
  { input: "0.1", expectedOutput: 0.1 },
  { input: "-0.1", expectedOutput: -0.1 },
  { input: `"string"`, expectedOutput: "string" },
  { input: `null`, expectedOutput: null },
  { input: `true`, expectedOutput: true },
  { input: `false`, expectedOutput: false },
  { input: `(1 "string" null true false)`, expectedOutput: [1, "string", null, true, false] },
];

describe("codegen() follows expected behavior", () => {
  positiveTestCases.forEach((testCase: IPositiveTestCase) => {
    test(`${testCase.input} => ${testCase.expectedOutput}`, () => {
      const lexer: Lexer = new Lexer(testCase.input);
      const parser: Parser = new Parser(lexer.lex());
      const squirrelAst: SquirrelType = parser.parse();
      const javaScriptAst: JavaScriptNode = codegen(squirrelAst);
      const javaScriptCode: string = convertToString(javaScriptAst);
      // tslint:disable-next-line:no-eval
      const actualOutput: string = eval(javaScriptCode);
      expect(actualOutput).toEqual(testCase.expectedOutput);
    });
  });
});
