export function clearPath(path: string) {
  return encodeURIComponent(path.replaceAll("//", "/"));
}
