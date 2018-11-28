export default function objectToString(o, sep = '&') {
  return Object.keys(o).map(key => `${key}=${o[key]}`).filter(v => v).join(sep);
}