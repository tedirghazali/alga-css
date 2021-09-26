const postcss = require('postcss')
const outlineProp = require('../props/outline-prop.js')
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
  
  if(cls[1] === 'offset') {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: outlineProp.offset, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  } else if(cls[1] === 'color') {
    if(gbl.includes(cls[2])) {
      arr.push(postcss.decl({prop: outlineProp.color, value: cls[2]}))
    } else if(isUtil.isColor(valueArg)) {
      arr.push(postcss.decl({prop: outlineProp.color, value: valueArg}))
    } else if(isUtil.isHex(valueArg)) {
      arr.push(postcss.decl({prop: outlineProp.color, value: valueArg.replace('hex(', '#').replace(')', '')}))
    }
  } else if(Object.keys(outlineProp.attrs).includes(cls[1])) {
    arr.push(postcss.decl({prop: outlineProp.attrs[cls[1]].key, value: outlineProp.attrs[cls[1]].val}))
    if(outlineProp.attrs[cls[1]].key === 'outline-style' && valueArg !== '') {
      arr.push(postcss.decl({ prop: outlineProp.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  } else if(Object.keys(opts.color).includes(cls[1])) {
    let outlineAlpha = 1
    if(valueArg !== '' && isNaN(valueArg) === false) {
      outlineAlpha = Number('0.'+valueArg)
    }
    arr.push(postcss.decl({prop: outlineProp.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
  } else {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: outlineProp.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  }
     
  return arr
}
