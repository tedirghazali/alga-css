const postcss = require('postcss')
const gbl = require('../props/global.js')
const unit = require('../props/unit.js')
const unitUtil = require('../utils/unit-util.js')
const calcUtil = require('../utils/calc-util.js')
const isUtil = require('../utils/is-util.js')

const rightLeft = ['right', 'left']
const topBottom = ['top', 'bottom']

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(topBottom.includes(cls[1])) {
    if(rightLeft.includes(cls[2])) {
      if(valueArg !== '') {
        if(isUtil.isCalc(valueArg)) {
          arr.push(postcss.decl({ prop: `border-${cls[1]}-${cls[2]}-radius`, value: calcUtil(valueArg) }))
        } else {
          arr.push(postcss.decl({ prop: `border-${cls[1]}-${cls[2]}-radius`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
        }
      }
    } else {
      if(valueArg !== '') {
        if(isUtil.isCalc(valueArg)) {
          arr.push(postcss.decl({ prop: `border-${cls[1]}-radius`, value: calcUtil(valueArg) }))
        } else {
          arr.push(postcss.decl({ prop: `border-${cls[1]}-radius`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
        }
      }
    }
  } else if(rightLeft.includes(cls[1])) {
    if(valueArg !== '') {
      if(isUtil.isCalc(valueArg)) {
        arr.push(postcss.decl({ prop: `border-${cls[1]}-radius`, value: calcUtil(valueArg) }))
      } else {
        arr.push(postcss.decl({ prop: `border-${cls[1]}-radius`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
      }
    }
  } else if(gbl.includes(cls[1])) {
    arr.push(postcss.decl({ prop: 'border-radius', value: cls[1] }))
  } else {
    if(valueArg !== '') {
      if(isUtil.isCalc(valueArg)) {
        arr.push(postcss.decl({ prop: 'border-radius', value: calcUtil(valueArg) }))
      } else {
        arr.push(postcss.decl({ prop: 'border-radius', value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
      }
    }
  }
  
  return arr
}
