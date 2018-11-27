/**
 * Makes the first letter in every word uppercase
 * @param {String} text 
 */
const ucfirst = text => text.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');

export default ucfirst