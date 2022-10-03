import { MapFunction } from "./MapTransform.ts";
import { deferred } from "../deps.ts";

export class MapAwaitParallelTransform<I, O> extends TransformStream<I, O> {
  readonly readable: ReadableStream<O>;
  readonly writable: WritableStream<I>;
  lastId = 0;
  readableController?: ReadableStreamDefaultController<O>;
  pendingPromises: { id: number; promise: Promise<number> }[] = [];
  deferredClose = deferred<number>();

  constructor(
    public mapFunction: MapFunction<I, Promise<O>>,
    public max?: number,
  ) {
    super();
    this.readable = new ReadableStream<O>({
      start: (controller: ReadableStreamDefaultController<O>) => {
        this.readableController = controller;
      },
    });
    this.writable = new WritableStream<I>({
      write: this.enqueue.bind(this),
      close: async () => {
        this.deferredClose.resolve(-1);
        await Promise.all(this.pendingPromises.map((e) => e.promise));
        this.readableController?.close();
      },
    });
  }

  async enqueue(chunk: I) {
    if (this.max && this.pendingPromises.length === this.max) {
      const racePromises = this.pendingPromises.map((e) => e.promise);
      const id = await Promise.race([this.deferredClose, ...racePromises]);
      const index = this.pendingPromises.findIndex((el) => el.id === id);
      this.pendingPromises.splice(index, 1);
    }
    const id = ++this.lastId;
    const promise = this.mapFunction(chunk)
      .then((result) => {
        this.readableController!.enqueue(result);
        return id;
      });
    this.pendingPromises.push({ id, promise });
  }
}
