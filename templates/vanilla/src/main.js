/**
 * startsWith polyfill
 *
 * @export
 * @param {*} str
 * @param {*} searchString
 * @param {*} position
 * @return {*}
 */
export default function startsWith(str, searchString, position) {
  const pos = position || 0;
  return str.substr(pos, searchString.length) === searchString;
}
