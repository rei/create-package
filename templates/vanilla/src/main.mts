/**
 * startsWith polyfill
 */
export default function startsWith(str: string, searchString: string, position?: number) {
  const pos = position || 0;
  return str.substr(pos, searchString.length) === searchString;
}
