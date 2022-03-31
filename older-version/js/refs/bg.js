const postcss = require('postcss')
const bgProp = require('../props/bg-prop.js')
//const gbl = require('../props/global.js')
//const unit = require('../props/unit.js')
const colorUtil = require('../utils/color-util.js')
//const unitUtil = require('../utils/unit-util.js')
const isUtil = require('../utils/is-util.js')

const rightLeft = ['right', 'left']
const topBottom = ['top', 'bottom']
const sidePosition = [...topBottom, ...rightLeft]

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(Object.keys(bgProp.attrs).includes(cls[1])) {
    if(typeof bgProp.attrs[cls[1]].val === 'string') {
      arr.push(postcss.decl({prop: bgProp.attrs[cls[1]].key, value: bgProp.attrs[cls[1]].val}))
    } else {
      if(Object.keys(bgProp.attrs[cls[1]].val).includes(cls[2])) {
        arr.push(postcss.decl({prop: bgProp.attrs[cls[1]].key, value: bgProp.attrs[cls[1]].val[cls[2]]}))
      }
    }
  } else if(Object.keys(opts.color).includes(cls[1])) {
    let outlineAlpha = 1
    if(valueArg !== '' && isNaN(valueArg) === false) {
      outlineAlpha = Number('0.'+valueArg)
    }
    arr.push(postcss.decl({prop: bgProp.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
  } else if(cls[1] === 'color') {
    if(isUtil.isColor(valueArg)) {
      arr.push(postcss.decl({prop: bgProp.color, value: valueArg}))
    } else if(isUtil.isHex(valueArg)) {
      arr.push(postcss.decl({prop: bgProp.color, value: valueArg.replace('hex(', '#').replace(')', '')}))
    }
  } else if(['center', ...sidePosition].includes(cls[1])) {
    if(rightLeft.includes(cls[2])) {
      arr.push(postcss.decl({prop: bgProp.position, value: `${cls[1]} ${cls[2]}`}))
    } else {
      arr.push(postcss.decl({prop: bgProp.position, value: cls[1]}))
    }
  }
    
  return arr
}
