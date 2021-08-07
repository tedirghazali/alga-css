module.exports = {
  isColor(color) {
    return (/^[a-z]+$/.test(color) || (color.length <= 9 && color.startsWith('#')) || (color.startsWith('rgb(') && color.endsWith(')')) || (color.startsWith('rgba(') && color.endsWith(')')) || (color.startsWith('hsl(') && color.endsWith(')')) || (color.startsWith('hsla(') && color.endsWith(')'))) ? true : false
  }
}
