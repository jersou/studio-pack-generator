/**
 * It takes an array and returns a stream that emits each element of the array
 * @param {T[]} array The array to be converted to a stream.
 */
export function arrayToStream<T>(array: T[]) {
  return new ReadableStream<T>({
    start(controller) {
      array.map((e) => controller.enqueue(e));
      controller.close();
    },
  });
}
