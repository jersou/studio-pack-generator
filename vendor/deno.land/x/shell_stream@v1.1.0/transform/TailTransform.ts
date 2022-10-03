/* A TransformStream that outputs the last n items of the input stream */
export class TailTransform<T> extends TransformStream<T> {
  /**
   * @param {number} max  The maximum number of items to emit
   */
  constructor(max: number) {
    super(new TailTransformer<T>(max));
  }
}

class TailTransformer<T> implements Transformer<T> {
  buffer: T[] = [];
  constructor(private max: number) {}
  transform(line: T) {
    this.buffer.push(line);
    if (this.buffer.length > this.max + 1) {
      this.buffer.shift();
    }
  }
  flush(controller: TransformStreamDefaultController<T>) {
    if (this.buffer.length) {
      if (this.buffer[this.buffer.length - 1] as unknown as string === "") {
        this.buffer.pop();
      } else {
        this.buffer.shift();
      }
    }
    for (const line of this.buffer) {
      controller.enqueue(line);
    }
  }
}
