/* A TransformStream that outputs the first n items of the input stream */
export class HeadTransform<T> extends TransformStream<T> {
  /**
   * @param {number} max  The maximum number of items to emit
   */
  constructor(max: number) {
    super(new HeadTransformer<T>(max));
  }
}

class HeadTransformer<T> implements Transformer<T> {
  count = 0;
  constructor(private max: number) {}
  transform(line: T, controller: TransformStreamDefaultController<T>) {
    if (this.count < this.max) {
      this.count++;
      controller.enqueue(line);
    }
  }
}
