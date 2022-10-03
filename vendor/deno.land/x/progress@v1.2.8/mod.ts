import { bgGreen, bgWhite, writeAllSync } from "./deps.ts";
export { MultiProgressBar } from "./multi.ts";

const isTTY = Deno.stdout && Deno.isatty(Deno.stdout.rid);
const isWindow = Deno.build.os === "windows";

const enum Direction {
  left,
  right,
  all,
}

interface constructorOptions {
  title?: string;
  total?: number;
  width?: number;
  complete?: string;
  preciseBar?: string[];
  incomplete?: string;
  clear?: boolean;
  interval?: number;
  display?: string;
}

interface renderOptions {
  title?: string;
  total?: number;
  complete?: string;
  preciseBar?: string[];
  incomplete?: string;
}

export default class ProgressBar {
  title: string;
  total?: number;
  width: number;
  complete: string;
  preciseBar: string[];
  incomplete: string;
  clear: boolean;
  interval: number;
  display: string;

  private isCompleted = false;
  private lastStr = "";
  private start = Date.now();
  private lastRender = 0;
  private encoder = new TextEncoder();

  /**
   * Title, total, complete, incomplete, can also be set or changed in the render method
   *
   * @param title Progress bar title, default: ''
   * @param total total number of ticks to complete,
   * @param width the displayed width of the progress, default: 50
   * @param complete completion character, default: colors.bgGreen(' '), can use any string
   * @param incomplete incomplete character, default: colors.bgWhite(' '), can use any string
   * @param clear  clear the bar on completion, default: false
   * @param interval  minimum time between updates in milliseconds, default: 16
   * @param display  What is displayed and display order, default: ':title :percent :bar :time :completed/:total'
   */
  constructor(
    {
      title = "",
      total,
      width = 50,
      complete = bgGreen(" "),
      preciseBar = [],
      incomplete = bgWhite(" "),
      clear = false,
      interval = 16,
      display,
    }: constructorOptions = {},
  ) {
    this.title = title;
    this.total = total;
    this.width = width;
    this.complete = complete;
    this.preciseBar = preciseBar.concat(complete);
    this.incomplete = incomplete;
    this.clear = clear;
    this.interval = interval;
    this.display = display ?? ":title :percent :bar :time :completed/:total";
  }

  /**
   * "render" the progress bar
   *
   * - `completed` - completed value
   * - `options` - optional parameters
   *   - `title` - progress bar title
   *   - `total` - total number of ticks to complete
   *   - `complete` - completion character, If you want to change at a certain moment. For example, it turns red at 20%
   *   - `incomplete` - incomplete character, If you want to change at a certain moment. For example, it turns red at 20%
   */
  render(completed: number, options: renderOptions = {}): void {
    if (this.isCompleted || !isTTY) return;

    if (completed < 0) {
      throw new Error(`completed must greater than or equal to 0`);
    }

    const total = options.total ?? this.total ?? 100;
    const now = Date.now();
    const ms = now - this.lastRender;
    if (ms < this.interval && completed < total) return;

    this.lastRender = now;
    const time = ((now - this.start) / 1000).toFixed(1) + "s";
    const eta = completed == 0
      ? "-"
      : ((completed >= total)
        ? 0
        : (total / completed - 1) * (now - this.start) / 1000).toFixed(1) + "s";

    const percent = ((completed / total) * 100).toFixed(2) + "%";

    // :title :percent :bar :time :completed/:total
    let str = this.display
      .replace(":title", options.title ?? this.title)
      .replace(":time", time)
      .replace(":eta", eta)
      .replace(":percent", percent)
      .replace(":completed", completed + "")
      .replace(":total", total + "");

    // compute the available space (non-zero) for the bar
    let availableSpace = Math.max(
      0,
      this.ttyColumns - str.replace(":bar", "").length,
    );
    if (availableSpace && isWindow) availableSpace -= 1;

    const width = Math.min(this.width, availableSpace);
    const finished = completed >= total;

    const preciseBar = options.preciseBar ?? this.preciseBar;
    const precision = preciseBar.length > 1;

    // :bar
    const completeLength = width * completed / total;
    const roundedCompleteLength = Math.floor(completeLength);

    let precise = "";
    if (precision) {
      const preciseLength = completeLength - roundedCompleteLength;
      precise = finished
        ? ""
        : preciseBar[Math.floor(preciseBar.length * preciseLength)];
    }

    const complete = new Array(roundedCompleteLength).fill(
      options.complete ?? this.complete,
    ).join("");
    const incomplete = new Array(
      Math.max(width - roundedCompleteLength - (precision ? 1 : 0), 0),
    ).fill(options.incomplete ?? this.incomplete).join("");

    str = str.replace(":bar", complete + precise + incomplete);

    if (str.length < this.lastStr.length) {
      str += " ".repeat(this.lastStr.length - str.length);
    }

    if (str !== this.lastStr) {
      this.write(str);
      this.lastStr = str;
    }

    if (finished) this.end();
  }

  /**
   * end: end a progress bar.
   * No need to call in most cases, unless you want to end before 100%
   */
  end(): void {
    this.isCompleted = true;
    if (this.clear) {
      this.stdoutWrite("\r");
      this.clearLine();
    } else {
      this.breakLine();
    }
    this.showCursor();
  }

  /**
   * interrupt the progress bar and write a message above it
   *
   * @param message The message to write
   */
  console(message: string | number): void {
    this.clearLine();
    this.write(`${message}`);
    this.breakLine();
    this.write(this.lastStr);
  }

  private write(msg: string): void {
    msg = `\r${msg}\x1b[?25l`;
    this.stdoutWrite(msg);
  }

  private get ttyColumns(): number {
    return 100;
  }

  private breakLine() {
    this.stdoutWrite("\r\n");
  }

  private stdoutWrite(msg: string) {
    writeAllSync(Deno.stdout, this.encoder.encode(msg));
  }

  private clearLine(direction: Direction = Direction.all): void {
    switch (direction) {
      case Direction.all:
        this.stdoutWrite("\x1b[2K");
        break;
      case Direction.left:
        this.stdoutWrite("\x1b[1K");
        break;
      case Direction.right:
        this.stdoutWrite("\x1b[0K");
        break;
    }
  }

  private showCursor(): void {
    this.stdoutWrite("\x1b[?25h");
  }
}
