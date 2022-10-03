/**
 * Parse a process command as string into an array of parts of the command.
 * Returns cmdOrStr if it's an array
 * @param {string[] | string} cmdOrStr The command to be parsed.
 * @returns An array of strings.
 */
export function parseCmdString(cmdOrStr: string[] | string): string[] {
  return cmdOrStr instanceof Array ? cmdOrStr : cmdOrStr
    .trim()
    .match(/((?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^ "']+)+)/g)!
    .map((p) =>
      p.match(/^"((\\"|[^"])*)"$/)
        ? p.replace(/^"((\\"|[^"])*)"$/, "$1")
        : p.match(/^'((\\'|[^'])*)'$/)
        ? p.replace(/^'((\\'|[^'])*)'$/, "$1")
        : p
    );
}
