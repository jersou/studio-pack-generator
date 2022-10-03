/**
 * TransformStream which emits only if the line is different from the previous line
 */
export class UniqTransform<T> extends TransformStream<T> {
  constructor() {
    super(new UniqTransformer<T>());
  }
}

class UniqTransformer<T> implements Transformer<T> {
  buffer?: T;
  transform(line: T, controller: TransformStreamDefaultController<T>) {
    if (this.buffer !== line) {
      this.buffer = line;
      controller.enqueue(line);
    }
  }
}
