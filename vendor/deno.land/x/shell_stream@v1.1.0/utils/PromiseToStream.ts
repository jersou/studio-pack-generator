/**
 * It takes a promise that resolves to a readable stream, and returns a readable
 * stream synchronously
 * @param promise The promise to resolve.
 */
export function promiseToStream(
  promise: Promise<ReadableStream>,
): ReadableStream {
  return new ReadableStream({
    start(controller) {
      promise.then(async (readableStream) => {
        const reader = readableStream.getReader();
        let res;
        while (!res?.done) {
          res = await reader.read();
          controller.enqueue(res.value);
        }
        controller.close();
      });
    },
  });
}
