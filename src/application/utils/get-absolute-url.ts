export function getAbsoluteUrl(path: string): string {
  return `${process.env.API_URL}${path}`;
}