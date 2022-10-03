import { RunStream } from "./RunStream.ts";

export class RunError extends Error {
  constructor(public message: string, public runStream: RunStream) {
    super(message);
  }
}
