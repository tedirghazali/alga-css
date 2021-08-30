const postcss = require('postcss')
const txtProp = require('../props/txt-prop.js')
const gbl = require('../props/global.js')
const unit = require('../props/unit.js')
const colorUtil = require('../utils/color-util.js')
const unitUtil = require('../utils/unit-util.js')
const isUtil = require('../utils/is-util.js')

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(Object.keys(txtProp.position.val).includes(cls[1])) {
    arr.push(postcss.decl({prop: txtProp.position.key, value: txtProp.position.val[cls[1]]}))
  } else if(cls[1] === 'align') {
    if(gbl.includes(cls[2])) {
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
  } else if(Object.keys(txtProp.weight.val).includes(cls[1])) {
    arr.push(postcss.decl({prop: txtProp.weight.key, value: txtProp.weight.val[cls[1]]}))
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: txtProp.width.key, value: unitUtil(valueArg, unit.length, 'pt', 1) }))
    }
  } else if(Object.keys(txtProp.style.val).includes(cls[1])) {
    arr.push(postcss.decl({prop: txtProp.style.key, value: txtProp.style.val[cls[1]]}))
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: txtProp.width.key, value: unitUtil(valueArg, unit.length, 'pt', 1) }))
    }
  } else if(Object.keys(txtProp.transform.val).includes(cls[1])) {
    arr.push(postcss.decl({prop: txtProp.transform.key, value: txtProp.transform.val[cls[1]]}))
  } else if(Object.keys(txtProp.width.val).includes(cls[1])) {
    arr.push(postcss.decl({prop: txtProp.width.key, value: txtProp.width.val[cls[1]]}))
  } else if(Object.keys(txtProp.decoration.val).includes(cls[1])) {
    arr.push(postcss.decl({prop: txtProp.decoration.key, value: txtProp.decoration.val[cls[1]]}))
    if(Object.keys(opts.color).includes(cls[2])) {
      let outlineAlpha = 1
      if(valueArg !== '' && isNaN(valueArg) === false) {
        outlineAlpha = Number('0.'+valueArg)
      }
      arr.push(postcss.decl({prop: 'text-decoration-color', value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[3]]}))
    } else if(cls[2] === 'color') {
      if(isUtil.isColor(valueArg)) {
        arr.push(postcss.decl({prop: 'text-decoration-color', value: valueArg}))
      } else if(isUtil.isHex(valueArg)) {
        arr.push(postcss.decl({prop: 'text-decoration-color', value: valueArg.replace('hex(', '#').replace(')', '')}))
      }
    } else if(txtProp['text-decoration-style'].includes(cls[2])) {
      arr.push(postcss.decl({prop: 'text-decoration-style', value: cls[2]}))
    } else {
      if(valueArg !== '') {
        arr.push(postcss.decl({ prop: 'text-decoration-thickness', value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    }
  } else if(cls[1] === 'shadow') {
    arr.push(postcss.decl({prop: 'text-shadow', value: 'var(--shadow-offset-x, 0px) var(--shadow-offset-y, 0px) var(--shadow-blur, 0px) var(--shadow-radius, 0px) var(--shadow-color, currentColor)'}))
  } else {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: txtProp.width.key, value: unitUtil(valueArg, unit.length, 'pt', 1) }))
    }
  }
  
  return arr
}
