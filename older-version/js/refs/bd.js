const postcss = require('postcss')
const bdProp = require('../props/bd-prop.js')
const gbl = require('../props/global.js')
const unit = require('../props/unit.js')
const colorUtil = require('../utils/color-util.js')
const unitUtil = require('../utils/unit-util.js')
const isUtil = require('../utils/is-util.js')

const rightLeft = ['right', 'left']
const topBottom = ['top', 'bottom']
const sidePosition = [...topBottom, ...rightLeft]

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  if(cls[1] === 'collapse') {
    arr.push(postcss.decl({prop: bdProp.collapse, value: 'collapse'}))
  } else if(cls[1] === 'color') {
    if(gbl.includes(cls[2])) {
      arr.push(postcss.decl({prop: bdProp.color, value: cls[2]}))
    } else if(isUtil.isColor(valueArg)) {
      arr.push(postcss.decl({prop: bdProp.color, value: valueArg}))
    } else if(isUtil.isHex(valueArg)) {
      arr.push(postcss.decl({prop: bdProp.color, value: valueArg.replace('hex(', '#').replace(')', '')}))
    }
  } else if(Object.keys(bdProp.attrs).includes(cls[1])) {
    arr.push(postcss.decl({prop: bdProp.attrs[cls[1]].key, value: bdProp.attrs[cls[1]].val}))
    if(bdProp.attrs[cls[1]].key === 'border-style' && valueArg !== '') {
      arr.push(postcss.decl({ prop: bdProp.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  } else if(Object.keys(opts.color).includes(cls[1])) {
    let bdAlpha = 1
    if(valueArg !== '' && isNaN(valueArg) === false) {
      bdAlpha = Number('0.'+valueArg)
    }
    arr.push(postcss.decl({prop: bdProp.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], bdAlpha) : opts.color[cls[1]]}))
  } else if(sidePosition.includes(cls[1])) {
    if(cls[2] === 'color') {
      if(gbl.includes(cls[3])) {
        arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: cls[3]}))
      } else if(isUtil.isColor(valueArg)) {
        arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: valueArg}))
      } else if(isUtil.isHex(valueArg)) {
        arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: valueArg.replace('hex(', '#').replace(')', '')}))
      }
    } else if(Object.keys(bdProp.attrs).includes(cls[2])) {
      if(bdProp.attrs[cls[2]].key === 'border-style') {
        arr.push(postcss.decl({prop: `border-${cls[1]}-style`, value: bdProp.attrs[cls[2]].val}))
        if(valueArg !== '') {
          arr.push(postcss.decl({ prop: `border-${cls[1]}-width`, value: unitUtil(valueArg, unit.length, 'px', 1) }))
        }
      } else if(bdProp.attrs[cls[2]].key === 'border-width') {
        arr.push(postcss.decl({prop: `border-${cls[1]}-width`, value: bdProp.attrs[cls[2]].val}))
      }
    } else if(Object.keys(opts.color).includes(cls[2])) {
      let bdAlpha = 1
      if(valueArg !== '' && isNaN(valueArg) === false) {
        bdAlpha = Number('0.'+valueArg)
      }
      arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: (typeof opts.color[cls[2]] !== 'string') ? colorUtil(opts.color[cls[2]], bdAlpha) : opts.color[cls[2]]}))
    } else {
      if(valueArg !== '') {
        arr.push(postcss.decl({ prop: `border-${cls[1]}-width`, value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    }
  } else if(cls[1] === 'x') {
    if(valueArg !== '') {
      arr.push(
        postcss.decl({ prop: 'border-right-width', value: unitUtil(valueArg, unit.length, 'px', 1) }),
        postcss.decl({ prop: 'border-left-width', value: unitUtil(valueArg, unit.length, 'px', 1) })
      )
    }
  } else if(cls[1] === 'y') {
    if(valueArg !== '') {
      arr.push(
        postcss.decl({ prop: 'border-top-width', value: unitUtil(valueArg, unit.length, 'px', 1) }),
        postcss.decl({ prop: 'border-bottom-width', value: unitUtil(valueArg, unit.length, 'px', 1) })
      )
    }
  } else if(cls[1] === 'spacing') {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: 'border-spacing', value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  } else if(Object.keys(bdProp.writing).includes(cls[1])) {
    if(['start', 'end'].includes(cls[2])) {
      if(cls[3] === 'color') {
        if(gbl.includes(cls[4])) {
          arr.push(postcss.decl({prop: `${bdProp.writing[cls[1]]}-${cls[2]}-color`, value: cls[4]}))
        } else if(isUtil.isColor(valueArg)) {
          arr.push(postcss.decl({prop: `${bdProp.writing[cls[1]]}-${cls[2]}-color`, value: valueArg}))
        } else if(isUtil.isHex(valueArg)) {
          arr.push(postcss.decl({prop: `${bdProp.writing[cls[1]]}-${cls[2]}-color`, value: valueArg.replace('hex(', '#').replace(')', '')}))
        }
      } else if(Object.keys(bdProp.attrs).includes(cls[3])) {
        if(bdProp.attrs[cls[3]].key === 'border-style') {
          arr.push(postcss.decl({prop: `${bdProp.writing[cls[1]]}-${cls[2]}-style`, value: bdProp.attrs[cls[3]].val}))
          if(valueArg !== '') {
            arr.push(postcss.decl({ prop: `${bdProp.writing[cls[1]]}-${cls[2]}-width`, value: unitUtil(valueArg, unit.length, 'px', 1) }))
          }
        } else if(bdProp.attrs[cls[3]].key === 'border-width') {
          arr.push(postcss.decl({prop: `${bdProp.writing[cls[1]]}-${cls[2]}-width`, value: bdProp.attrs[cls[3]].val}))
        }
      } else if(Object.keys(opts.color).includes(cls[3])) {
        let bdAlpha = 1
        if(valueArg !== '' && isNaN(valueArg) === false) {
          bdAlpha = Number('0.'+valueArg)
        }
        arr.push(postcss.decl({prop: `${bdProp.writing[cls[1]]}-${cls[2]}-color`, value: (typeof opts.color[cls[3]] !== 'string') ? colorUtil(opts.color[cls[3]], bdAlpha) : opts.color[cls[3]]}))
      } else {
        if(valueArg !== '') {
          arr.push(postcss.decl({ prop: `${bdProp.writing[cls[1]]}-${cls[2]}-width`, value: unitUtil(valueArg, unit.length, 'px', 1) }))
        }
      }
    }
  } else {
    if(valueArg !== '') {
      arr.push(postcss.decl({ prop: bdProp.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
    }
  }
    
  return arr
}
