import { ShellStream } from "../shell_stream.ts";
import { Operator, OperatorFunc } from "../types.ts";

export const pipe: Operator = (...operators: OperatorFunc[]) =>
  (shellStream: ShellStream) => {
    let current: ShellStream = shellStream;
    for (const operator of operators) {
      current = operator(current);
    }
    return current;
  };
