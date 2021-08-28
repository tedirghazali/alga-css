const postcss = require('postcss')
const txtProp = require('../props/txt-prop.js')
const global = require('../props/global.js')
const unit = require('../props/unit.js')
const colorUtil = require('../utils/color-util.js')
const unitUtil = require('../utils/unit-util.js')
const isUtil = require('../utils/is-util.js')

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(Object.keys(txtProp.position.val).includes(cls[1])) {
    if(typeof txtProp.position.val[cls[1]] === 'string') {
      arr.push(postcss.decl({prop: txtProp.position.key, value: txtProp.position.val[cls[1]]}))
    }
  } else if(cls[1] === 'align') {
    if(global.includes(cls[2])) {
      arr.push(postcss.decl({prop: txtProp.position.key, value: cls[2]}))
    } else if(cls[2] === 'webkit') {
      arr.push(postcss.decl({prop: txtProp.position.key, value: '-webkit-match-parent'}))
    }
  } else if(cls[1] === 'color') {
    if(isUtil.isColor(valueArg)) {
      arr.push(postcss.decl({prop: 'color', value: valueArg}))
    } else if(isUtil.isHex(valueArg)) {
      arr.push(postcss.decl({prop: 'color', value: valueArg.replace('hex(', '#').replace(')', '')}))
    }
  } else if(Object.keys(opts.color).includes(cls[1])) {
    let outlineAlpha = 1
    if(valueArg !== '' && isNaN(valueArg) === false) {
      outlineAlpha = Number('0.'+valueArg)
    }
    arr.push(postcss.decl({prop: txtProp.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
  } else {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: txtProp.width.key, value: unitUtil(valueArg, unit.length, 'pt', 1) }))
    }
  }
  
  return arr
}
