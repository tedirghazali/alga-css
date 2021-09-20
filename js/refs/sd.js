const postcss = require('postcss')
const sdProp = require('../props/sd-prop.js')
const gbl = require('../props/global.js')
const unit = require('../props/unit.js')
//const colorUtil = require('../utils/color-util.js')
const unitUtil = require('../utils/unit-util.js')
const isUtil = require('../utils/is-util.js')

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(cls[1] === 'x') {
    if(valueArg !== '') {
      arr.push(postcss.decl({prop: '--shadow-offset-x', value: unitUtil(valueArg, unit.length, 'px', 1)}))
    }
  } else if(cls[1] === 'y') {
    if(valueArg !== '') {
      arr.push(postcss.decl({prop: '--shadow-offset-y', value: unitUtil(valueArg, unit.length, 'px', 1)}))
    }
  } else if(cls[1] === 'blur') {
    if(valueArg !== '') {
      arr.push(postcss.decl({prop: '--shadow-blur', value: unitUtil(valueArg, unit.length, 'px', 1)}))
    }
  } else if(cls[1] === 'radius') {
    if(valueArg !== '') {
      arr.push(postcss.decl({prop: '--shadow-radius', value: unitUtil(valueArg, unit.length, 'px', 1)}))
    }
  } else if(cls[1] === 'color') {
    let shadowColor = 'currentColor'
    if(valueArg !== '') {
      if(isUtil.isColor(valueArg)) {
        shadowColor = valueArg
      } else if(isUtil.isHex(valueArg)) {
        shadowColor = valueArg.replace('hex(', '#').replace(')', '')
      }
      arr.push(postcss.decl({prop: '--shadow-color', value: shadowColor}))
    }
  } else if(gbl.includes(cls[1])) {
    arr.push(postcss.decl({ prop: 'box-shadow', value: cls[1]}))
  } else if(cls[1] === 'inset') {
    arr.push(postcss.decl({ prop: 'box-shadow', value: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'}))
  } else {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: 'box-shadow', value: sdProp[valueArg] }))
    } else {
      arr.push(postcss.decl({ prop: 'box-shadow', value: 'var(--shadow-offset-x, 0px) var(--shadow-offset-y, 0px) var(--shadow-blur, 0px) var(--shadow-radius, 0px) var(--shadow-color, currentColor)' }))
    }
  }
  
  return arr
}
