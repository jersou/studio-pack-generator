import { log, LogTransformFunction } from "./operators/log.ts";
import { toFile } from "./endpoints/to_file.ts";
import { run, RunOptions } from "./operators/run.ts";
import { grep } from "./operators/grep.ts";
import { timestamp } from "./operators/timestamp.ts";
import { tap, TapFunction } from "./operators/tap.ts";
import { replace, Replacer } from "./operators/replace.ts";
import { map, MapFunction } from "./operators/map.ts";
import { filter, FilterFunction } from "./operators/filter.ts";
import { cut } from "./operators/cut.ts";
import { Generator, OperatorFunc } from "./types.ts";
import { close, CloseOptions } from "./endpoints/close.ts";
import { toString } from "./endpoints/to_string.ts";
import { toArray } from "./endpoints/to_array.ts";
import { pipe } from "./operators/pipe.ts";
import { tee } from "./operators/tee.ts";
import { from } from "./startpoints/from.ts";
import { fromFile, FromFileOpt } from "./startpoints/from_file.ts";
import { fromArray } from "./startpoints/from_array.ts";
import { fromRun } from "./startpoints/from_run.ts";
import { fromString } from "./startpoints/from_string.ts";
import { tail } from "./operators/tail.ts";
import { head } from "./operators/head.ts";
import { logWithTimestamp } from "./operators/logWithTimestamp.ts";
import { success } from "./endpoints/success.ts";
import { sponge } from "./operators/sponge.ts";
import { fromDir } from "./startpoints/from_dir.ts";
import { fromWalk } from "./startpoints/from_walk.ts";
import { WalkOptions } from "./deps.ts";
import { sort } from "./operators/sort.ts";
import { uniq } from "./operators/uniq.ts";
import { toIterable } from "./endpoints/to_iterable.ts";

export class ShellStream {
  process?: Deno.Process;
  processStatus?: Deno.ProcessStatus;
  processCmd?: string[];
  file?: Deno.File;

  private constructor(
    public parents: ShellStream[],
    public generator: Generator,
  ) {}

  run = (cmd: string[] | string, opt?: RunOptions): ShellStream =>
    run(cmd, opt)(this);
  toFile = (outputPath: string) => toFile(outputPath)(this);
  tee = (outputPath: string) => tee(outputPath)(this);
  log = (transform?: LogTransformFunction) => log(transform)(this);
  logWithTimestamp = () => logWithTimestamp()(this);
  grep = (regex: RegExp) => grep(regex)(this);
  timestamp = () => timestamp()(this);
  tap = (tapFunction: TapFunction) => tap(tapFunction)(this);
  replace = (v: string | RegExp, r: Replacer) => replace(v, r)(this);
  map = (mapFunction: MapFunction) => map(mapFunction)(this);
  filter = (filterFunction: FilterFunction) => filter(filterFunction)(this);
  cut = (delim: string, i: number[], sep = " ") => cut(delim, i, sep)(this);
  head = (count = 1) => head(count)(this);
  tail = (count = 1) => tail(count)(this);
  sponge = () => sponge()(this);
  sort = () => sort()(this);
  uniq = () => uniq()(this);

  pipe = (...operators: OperatorFunc[]) => pipe(...operators)(this);

  // EndOperators
  close = async (opt: CloseOptions = { processes: "AWAIT" }) =>
    await close(opt)(this);
  toString = async () => await toString()(this);
  toArray = async () => await toArray()(this);
  toIterable = () => toIterable()(this);
  success = async () => await success()(this);

  static builder(generator: Generator, inputStream?: ShellStream): ShellStream {
    return new ShellStream(
      inputStream ? [...inputStream.parents, inputStream] : [],
      generator,
    );
  }
  static empty(): ShellStream {
    const emptyGenerator: Generator = (async function* () {})();
    return new ShellStream([], emptyGenerator);
  }

  static from = (iterable: AsyncIterable<string> | Iterable<string>) =>
    from(iterable)();
  static fromFile = (path: string, opt?: FromFileOpt) => fromFile(path, opt)();
  static fromDir = (path: string) => fromDir(path)();
  static fromWalk = (path: string, opt?: WalkOptions) => fromWalk(path, opt)();
  static fromArray = (lines: string[]) => fromArray(lines)();
  static fromString = (line: string) => fromString(line)();
  static fromRun = (cmd: string[] | string, opt?: RunOptions) =>
    fromRun(cmd, opt)();
  static pipe = (...op: OperatorFunc[]) => pipe(...op)(ShellStream.empty());

  static processCount = 0;
  static processDone = 0;
  static processEventListener: ProcessEventListener[] = [];
  static subscribeProcessEvent(listener: ProcessEventListener) {
    ShellStream.processEventListener.push(listener);
  }
  static unsubscribeProcessEvent(listener: ProcessEventListener) {
    ShellStream.processEventListener = ShellStream.processEventListener.filter(
      (l) => l !== listener,
    );
  }
  static sendProcessEvent() {
    ShellStream.processEventListener.forEach((listener: ProcessEventListener) =>
      listener({
        processCount: ShellStream.processCount,
        processDone: ShellStream.processDone,
      })
    );
  }
  static incProcessCount() {
    ShellStream.processCount++;
    ShellStream.sendProcessEvent();
  }
  static incProcessDone() {
    ShellStream.processDone++;
    ShellStream.sendProcessEvent();
  }
}
export type ProcessEvent = { processCount: number; processDone: number };
export type ProcessEventListener = (event: ProcessEvent) => unknown;

export const Pipe = ShellStream.pipe;
export const From = ShellStream.from;
export const FromFile = ShellStream.fromFile;
export const FromDir = ShellStream.fromDir;
export const FromWalk = ShellStream.fromWalk;
export const FromRun = ShellStream.fromRun;
export const FromArray = ShellStream.fromArray;
export const FromString = ShellStream.fromString;
