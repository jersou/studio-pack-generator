export type MapFunction<T, U> = (line: T) => U;

/* Transforms the data that passes through it */
export class MapTransform<T, U> extends TransformStream<T, U> {
  /**
   * Create a new transformer that applies the given map function to each element
   * of the source
   * @param mapFunction - A function that transform each element
   */
  constructor(mapFunction: MapFunction<T, U>) {
    super(new MapTransformer<T, U>(mapFunction));
  }
}

class MapTransformer<T, U> implements Transformer<T, U> {
  constructor(private mapFunction: MapFunction<T, U>) {
  }
  transform(
    str: T,
    controller: TransformStreamDefaultController<U>,
  ) {
    controller.enqueue(this.mapFunction(str));
  }
}
