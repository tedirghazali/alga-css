module.exports = {
  isColor(color) {
    return ((color.startsWith('rgb(') && color.endsWith(')')) || (color.startsWith('rgba(') && color.endsWith(')')) || (color.startsWith('hsl(') && color.endsWith(')')) || (color.startsWith('hsla(') && color.endsWith(')'))) ? true : false
  },
  isHex(color) {
    return (color.length <= 13 && color.startsWith('hex(') && color.endsWith(')')) ? true : false
  },
  isCalc(calc) {
    return (calc.startsWith('calc') && calc.endsWith(')')) ? true : false
  }
}
