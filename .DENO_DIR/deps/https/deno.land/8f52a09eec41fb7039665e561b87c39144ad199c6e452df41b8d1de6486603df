import { ShellStream } from "./shell_stream.ts";

// deno-lint-ignore no-explicit-any
export type StartOperator = (...args: any[]) => StartOperatorFunc;
export type StartOperatorFunc = () => ShellStream;

// deno-lint-ignore no-explicit-any
export type Operator = (...args: any[]) => OperatorFunc;
export type OperatorFunc = (shellStream: ShellStream) => ShellStream;

// deno-lint-ignore no-explicit-any
export type EndOperator<T> = (...args: any[]) => EndOperatorFunc<T>;
export type EndOperatorFunc<T> = (shellStream: ShellStream) => Promise<T>;

export type Generator = AsyncIterableIterator<string>;
