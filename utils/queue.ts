// from https://github.com/magic-akari/yocto_queue/blob/v0.1.4/src/queue.ts

interface Node<T> {
  value: T;
  next?: Node<T>;
}

export class Queue<T = unknown> implements Iterable<T> {
  #head?: Node<T>;
  #tail?: Node<T>;
  #size = 0;

  public enqueue(...values: T[]) {
    for (const value of values) {
      const node: Node<T> = {
        value,
      };

      if (this.#head && this.#tail) {
        this.#tail.next = node;
        this.#tail = node;
      } else {
        this.#head = node;
        this.#tail = node;
      }

      this.#size += 1;
    }
  }

  public dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }

    this.#head = current.next;
    this.#size -= 1;

    return current.value;
  }

  public clear() {
    this.#head = undefined;
    this.#tail = undefined;
    this.#size = 0;
  }

  public get size() {
    return this.#size;
  }

  *[Symbol.iterator](): Iterator<T, void, undefined> {
    let current = this.#head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
