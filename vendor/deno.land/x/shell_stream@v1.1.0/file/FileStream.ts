import { readAll, TextLineStream } from "../deps.ts";
import { LineStream } from "../line/LineStream.ts";
import { Stream } from "../Stream.ts";

export class FileStream extends LineStream<string> {
  fsFile: Deno.FsFile;

  /**
   * Read the file and returns a LineStream of the content
   * @param {Deno.FsFile | string} file Deno.FsFile | string
   * @param [parent] The content as LineStream.
   */
  constructor(public file: Deno.FsFile | string, parent?: LineStream<unknown>) {
    super(parent);
    this.fsFile = (typeof file === "string") ? Deno.openSync(file) : file;
  }

  /**
   * convert the stream output to stream of lines
   * @returns A ReadableStream that emits each line of the stream output
   */
  getLineReadableStream(): ReadableStream<string> {
    if (!this.linesStream) {
      this.linesStream = this
        .toByteReadableStream()
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream());
    }
    return this.linesStream!;
  }

  /**
   *  does not make sense for Filestream
   * @returns a promise that resolves to the current object
   */
  wait(): Promise<this> {
    return Promise.resolve(this);
  }

  /**
   * @returns A promise of output of the stream, as Uint8Array
   */
  async toBytes() {
    if (Stream.verbose) {
      console.log("ReadAll file", this.file);
    }
    const bytes = await readAll(this.fsFile);
    Deno.close(this.fsFile.rid);
    return bytes;
  }

  /**
   * @returns A promise of output of the stream, as string
   */
  async toString() {
    return new TextDecoder().decode(await this.toBytes());
  }

  /**
   * @returns the file readable of the stream
   */
  toByteReadableStream() {
    if (Stream.verbose) {
      console.log("Open readable of file", this.file);
    }
    return this.fsFile.readable;
  }

  /**
   * Write the stream output in the file
   * @param {Deno.FsFile | string} file file to write
   * @returns promise of itself.
   */
  async toFile(file: Deno.FsFile | string) {
    const fsFile = (typeof file === "string") ? await Deno.create(file) : file;
    await this.fsFile.readable.pipeTo(fsFile.writable);
    return this.wait();
  }
}
