/* Filter the input, keep only the results of the RegExp */
export class GrepoTransform<T> extends TransformStream<T, string> {
  /**
   * @param {RegExp | string} regex The regular expression to match against.
   */
  constructor(regex: RegExp | string) {
    super(new GrepoTransformer<T>(regex));
  }
}

class GrepoTransformer<T> implements Transformer<T, string> {
  constructor(private regex: RegExp | string) {
  }
  transform(
    str: T,
    controller: TransformStreamDefaultController<string>,
  ) {
    const matchs = String(str).match(this.regex);
    matchs?.forEach((value) => controller.enqueue(value));
  }
}
