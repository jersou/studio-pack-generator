import { RunOptions, RunStream } from "./run/RunStream.ts";
import { arrayToStream } from "./utils/ArrayToStream.ts";
import { FileStream } from "./file/FileStream.ts";
import { LineStream } from "./line/LineStream.ts";
import { dirToStream } from "./utils/dirToStream.ts";
import { walkToStream } from "./utils/walkToStream.ts";
import { WalkEntry, WalkOptions } from "./deps.ts";
import { promiseToStream } from "./utils/PromiseToStream.ts";

/**
 *  Stream is a static class that is used to create streams.
 */
export abstract class Stream {
  /**
   * Create a FileStream from a process stdout/stderr
   * @param {string[] | string} cmdOrStr A string or array of strings that
   * represents the command to run.
   *
   * The future wait() call throw an error if the exit code !== 0, except if
   * option.allowFail === true
   * @param {RunOptions} [opt] options
   * @returns A RunStream object.
   * ```ts
   * import { Stream } from "https://deno.land/x/shell_stream/mod.ts";
   *
   * let kernelName = await Stream
   *   .fromRun("uname --kernel-name")
   *   .toString();
   * console.log(kernelName); // → Linux
   * ```
   */
  static fromRun(cmdOrStr: string[] | string, opt?: RunOptions): RunStream {
    return new RunStream(cmdOrStr, opt);
  }

  /**
   * Create a FileStream from a file
   * @param {Deno.FsFile | string} file to read
   * @returns A FileStream object.
   */
  static fromFile(file: Deno.FsFile | string): FileStream {
    return new FileStream(file);
  }

  /**
   * Create LineStream from an array
   * @param {T[]} array The input array to convert
   * @returns A `LineStream` of `T`.
   */
  static fromArray<T>(array: T[]): LineStream<T> {
    return new LineStream(undefined, arrayToStream(array));
  }

  /**
   * Create LineStream from each line of the string
   * @param {string} str The string to be split into lines.
   * @returns A LineStream of line (`string`).
   */
  static fromString(str: string): LineStream<string> {
    return new LineStream(undefined, arrayToStream(str.split("\n")));
  }

  /**
   * Create LineStream from each file of the directory
   * @param {string} path The path to the directory to list.
   * @returns A LineStream of `Deno.DirEntry`.
   */
  static fromDir(path: string): LineStream<Deno.DirEntry> {
    return new LineStream(undefined, dirToStream(path));
  }

  /**
   * Create LineStream recursively from each file and directory of the given
   * directory
   * @param {string} path The path to walk.
   * @param {WalkOptions} [opt] WalkOptions
   * @returns A LineStream of WalkEntry.
   */
  static fromWalk(path: string, opt?: WalkOptions): LineStream<WalkEntry> {
    return new LineStream(undefined, walkToStream(path, opt));
  }

  /**
   * Create LineStream from each line of the response body
   * @param {string} url The URL to stream.
   * @param {RequestInit} [requestInit] query options
   * @returns A LineStream.
   */
  static fromFetch(url: string, requestInit?: RequestInit): LineStream<string> {
    return new LineStream(
      undefined,
      promiseToStream(
        fetch(url, requestInit).then((r) =>
          r.body!.pipeThrough(new TextDecoderStream())
        ),
      ),
    );
  }

  // region ---------------- verbose ---------------
  /* A way to set the verbosity */
  static verbose = false;
  /**
   * Set the verbose mode
   * @param {boolean} verbose boolean
   */
  static setVerbose(verbose: boolean) {
    Stream.verbose = verbose;
  }
  // endregion ---------------- verbose ---------------

  // region ---------------- process Event Listener ---------------
  /* Count the number of process that have been started */
  static processCount = 0;
  /* Counting the number of process that are done */
  static processDone = 0;
  /* subscribe to the process event. */
  static processEventListener: ProcessEventListener[] = [];
  /**
   * It subscribes the listener to the process event.
   * @param {ProcessEventListener} listener The function that will be called when
   * the event is fired.
   */
  static subscribeProcessEvent(listener: ProcessEventListener) {
    Stream.processEventListener.push(listener);
  }
  /**
   * Remove the listener from the listeners
   * @param {ProcessEventListener} listener the listener to remove
   */
  static unsubscribeProcessEvent(listener: ProcessEventListener) {
    Stream.processEventListener = Stream.processEventListener.filter(
      (l) => l !== listener,
    );
  }
  /**
   * Send a process event to all listeners
   */
  static sendProcessEvent() {
    Stream.processEventListener.forEach((listener: ProcessEventListener) =>
      listener({
        processCount: Stream.processCount,
        processDone: Stream.processDone,
      })
    );
  }
  static resetProcessCount() {
    Stream.processCount = 0;
    Stream.processDone = 0;
  }
  /**
   * Increment the process count and send a process event
   */
  static incProcessCount() {
    Stream.processCount++;
    Stream.sendProcessEvent();
  }
  /**
   * Increment the number of processes that have completed
   */
  static incProcessDone() {
    Stream.processDone++;
    Stream.sendProcessEvent();
  }
  // endregion ---------------- process Event Listener ---------------

  // region ---------------- cwd ---------------
  /* A way to set the current working directory, used by Deno.run() */
  static cwd?: string;
  /**
   * Sets the current working directory, used by Deno.run()
   * @param {string} newCwd The new current working directory.
   */
  static setCwd(newCwd: string) {
    Stream.cwd = newCwd;
  }
  /**
   * Return the current "Stream" working directory
   * @returns The current working directory
   */
  static getCwd() {
    return Stream.cwd;
  }
  // endregion ---------------- cwd ---------------
}
/**
 * Represents a process event.
 * @property {number} processCount The total number of processes that have been
 * started.
 * @property {number} processDone number of processes that have finished
 */
export type ProcessEvent = { processCount: number; processDone: number };

export type ProcessEventListener = (event: ProcessEvent) => unknown;

// aliases
/* Alias of `Stream.setCwd` */
export const setCwd = Stream.setCwd;
/* Alias of `Stream.fromRun` */
export const run = Stream.fromRun;
/* Alias of `Stream.fromFile` */
export const read = Stream.fromFile;

/**
 * `waitRun` is an alias of `Stream.fromRun(cmdOrStr, opt).wait()`
 * @param {string[] | string} cmdOrStr A string or array of strings that
 * represents the command to run.
 * @param {RunOptions} [opt] options
 * @returns A promise of RunStream.
 */
export function waitRun(cmdOrStr: string[] | string, opt?: RunOptions) {
  return Stream.fromRun(cmdOrStr, opt).wait();
}
/**
 * `runOk` is an alias of `Stream.fromRun(cmdOrStr, opt).success()`
 * @param {string[] | string} cmdOrStr A string or array of strings that
 * represents the command to run.
 * @param {RunOptions} [opt] RunOptions
 * @returns A promise of boolean, true if the process was successful
 */
export function runOk(cmdOrStr: string[] | string, opt?: RunOptions) {
  return Stream.fromRun(cmdOrStr, opt).success();
}
/**
 * `runKo` is an alias of `Stream.fromRun(cmdOrStr, opt).fail()`
 * @param {string[] | string} cmdOrStr A string or array of strings that
 * represents the command to run.
 * @param {RunOptions} [opt] RunOptions
 * @returns A promise of boolean, true if the process has failed
 */
export function runKo(cmdOrStr: string[] | string, opt?: RunOptions) {
  return Stream.fromRun(cmdOrStr, opt).fail();
}
/**
 `runToString` is an alias of `Stream.fromRun(cmdOrStr, opt).fail()`
 @param {string[] | string} cmdOrStr A string or array of strings that
 represents the command to run.
 * @param {RunOptions} [opt] RunOptions
 * @returns A promise of the stdout/stderr as string.
 */
export function runToString(cmdOrStr: string[] | string, opt?: RunOptions) {
  return Stream.fromRun(cmdOrStr, opt).toString();
}
