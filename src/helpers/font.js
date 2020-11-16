export function getFontsLink (fonts, key) {
  return `https://fonts.googleapis.com/css?family=${[...new Set(fonts.map(font => font[key].replace(/ /g, '+')))].join('|')}`
}
