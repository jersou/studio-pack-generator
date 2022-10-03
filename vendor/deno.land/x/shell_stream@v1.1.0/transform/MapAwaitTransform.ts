import { MapFunction } from "./MapTransform.ts";

export class MapAwaitTransform<T, U> extends TransformStream<T, U> {
  constructor(mapFunction: MapFunction<T, Promise<U>>) {
    super(new MapAwaitTransformer<T, U>(mapFunction));
  }
}

class MapAwaitTransformer<T, U> implements Transformer<T, U> {
  constructor(private mapFunction: MapFunction<T, Promise<U>>) {
  }
  transform(
    chunk: T,
    controller: TransformStreamDefaultController<U>,
  ) {
    return this.mapFunction(chunk).then((r: U) => controller.enqueue(r));
  }
}
