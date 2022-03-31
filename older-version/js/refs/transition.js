const postcss = require('postcss')
const transitionProp = require('../props/transition-prop.js')
const gbl = require('../props/global.js')
const unit = require('../props/unit.js')
const colorUtil = require('../utils/color-util.js')
const unitUtil = require('../utils/unit-util.js')
const isUtil = require('../utils/is-util.js')

//const rightLeft = ['right', 'left']
//const topBottom = ['top', 'bottom']
//const sidePosition = [...topBottom, ...rightLeft]

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(cls[1] === 'duration') {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: transitionProp.offset, value: unitUtil(valueArg, unit.time, 's', 1) }))
    }
  } else if(cls[1] === 'delay') {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: transitionProp.offset, value: unitUtil(valueArg, unit.time, 's', 1) }))
    }
  } else if(cls[1] === 'color') {
    if(gbl.includes(cls[2])) {
      arr.push(postcss.decl({prop: transitionProp.color, value: cls[2]}))
    } else if(isUtil.isColor(valueArg)) {
      arr.push(postcss.decl({prop: transitionProp.color, value: valueArg}))
    } else if(isUtil.isHex(valueArg)) {
      arr.push(postcss.decl({prop: transitionProp.color, value: valueArg.replace('hex(', '#').replace(')', '')}))
    }
  } else if(Object.keys(transitionProp.attrs).includes(cls[1])) {
    arr.push(postcss.decl({prop: transitionProp.attrs[cls[1]].key, value: transitionProp.attrs[cls[1]].val}))
    if(transitionProp.attrs[cls[1]].key === 'outline-style' && valueArg !== '') {
      arr.push(postcss.decl({ prop: transitionProp.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  } else if(Object.keys(opts.color).includes(cls[1])) {
    let outlineAlpha = 1
    if(valueArg !== '' && isNaN(valueArg) === false) {
      outlineAlpha = Number('0.'+valueArg)
    }
    arr.push(postcss.decl({prop: transitionProp.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
  } else {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: transitionProp.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  }
     
  return arr
}
