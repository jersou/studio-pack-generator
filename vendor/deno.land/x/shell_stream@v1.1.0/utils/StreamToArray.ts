/**
 * Create ReadableStream from an array
 * @param {T[]} array The input array to convert
 * @returns A `ReadableStream` of `T`.
 */
export async function streamToArray<T>(
  stream: ReadableStream<T>,
): Promise<T[]> {
  const array = [];
  const reader = stream.getReader();
  let res;
  while (!res?.done) {
    res = await reader.read();
    if (res.value) {
      array.push(res.value);
    }
  }
  reader.releaseLock();
  return array;
}
