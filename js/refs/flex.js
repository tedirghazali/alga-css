const postcss = require('postcss')
const flexProp = require('../props/flex-prop.js')
const gbl = require('../props/global.js')
//const unit = require('../props/unit.js')
//const unitUtil = require('../utils/unit-util.js')
//const isUtil = require('../utils/is-util.js')

//const rightLeft = ['right', 'left']
//const topBottom = ['top', 'bottom']

module.exports = (cls, valueArg, opts) => {
  const arr = []
  
  const decl1 = postcss.decl({prop: 'display', value: 'flex'})
  if(Object.keys(flexProp.justify).includes(cls[1])) {
    const decl2 = postcss.decl({prop: flexProp.justify[cls[1]].key, value: flexProp.justify[cls[1]].val})
    arr.push(decl1, decl2)
  } else if(cls[1] === 'items' && Object.keys(flexProp.items).includes(cls[2])) {
    const decl2 = postcss.decl({prop: flexProp.items[cls[2]].key, value: flexProp.items[cls[2]].val})
    arr.push(decl1, decl2)
  } else if(Object.keys(flexProp.attrs).includes(cls[1])) {
    if(typeof flexProp.attrs[cls[1]].val === 'string') {
      arr.push(postcss.decl({prop: flexProp.attrs[cls[1]].key, value: flexProp.attrs[cls[1]].val}))
    } else if(typeof flexProp.attrs[cls[1]].val === 'object' && Object.keys(flexProp.attrs[cls[1]].val).includes(cls[2])) {
      arr.push(postcss.decl({prop: flexProp.attrs[cls[1]].key, value: flexProp.attrs[cls[1]].val[cls[2]]}))
    } else {
      if(flexProp.attrs[cls[1]].val.base) {
        arr.push(postcss.decl({prop: flexProp.attrs[cls[1]].key, value: flexProp.attrs[cls[1]].val.base}))
      }
    }
  } else if(flexProp.globals.includes(cls[1])) {
    if(gbl.includes(cls[2])) {
      arr.push(postcss.decl({prop: `flex-${cls[1]}`, value: cls[2]}))
    }
  } else if(gbl.includes(cls[1])) {
    arr.push(postcss.decl({prop: 'flex', value: cls[1]}))
  } else {
    if(valueArg !== '' && isNaN(valueArg) === false) {
      arr.push(postcss.decl({prop: 'flex', value: `${valueArg} 1 0px`}))
    } else {
      arr.push(decl1)
    }
  }
  
  return arr
}
