export type FilterFunction<T> = (line: T) => boolean;

/**
 * Filter the input, keep only the elements that returns true through the filter
 * function
 */
export class FilterTransform<T> extends TransformStream<T, T> {
  /**
   * @param filterFunction function used to filter the elements
   */
  constructor(filterFunction: FilterFunction<T>) {
    super(new FilterTransformer(filterFunction));
  }
}

class FilterTransformer<T> implements Transformer<T, T> {
  constructor(private filterFunction: FilterFunction<T>) {
  }
  transform(
    str: T,
    controller: TransformStreamDefaultController<T>,
  ) {
    if (this.filterFunction(str)) {
      controller.enqueue(str);
    }
  }
}
