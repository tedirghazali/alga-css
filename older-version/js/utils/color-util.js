module.exports = (color, alpha = 1) => {
  let clr = ''
  if(typeof color === 'string') { // for hex and name
    clr = color
  } else if(Array.isArray(color)) { // for rgb or rgba
    clr = `rgba(${color.join()}, ${alpha})`
  } else if(typeof color === 'object' && color !== null) { // for hsl or hsla
    clr = `hsla(${color.h}, ${color.s}, ${color.l ? color.l : color.v}, ${alpha})`
  }
  return clr
}
