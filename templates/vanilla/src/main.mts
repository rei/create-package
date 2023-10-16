/**
 * startsWith polyfill
 */
export default function startsWith(str: string, searchString: string, position: number = 0) {
  return str.substring(position, position + searchString.length) === searchString;
}
