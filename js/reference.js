const postcss = require('postcss')
const unit = require('./props/unit.js')
const sizing = require('./props/sizing.js')
const colorUtil = require('./utils/color-util.js')
const unitUtil = require('./utils/unit-util.js')

const positions = ['top', 'right', 'bottom', 'left']

module.exports = (ref, opts) => {
  const arr = []
  const obj = {}
  const state = {
    alpha: 1
  }
  
  const refs = ref.trim().split(/\.|-|_|\:/).filter(i => i !== '')
  
  if(Object.keys(opts.preset).includes(refs[0])) {
    refs[0] = opts.preset[param]
  }
  
  if(Object.keys(opts.screen).includes(refs[0])) {
    obj['screen'] = postcss.AtRule({ name: 'media', params: '(min-width: ${opts.screen[refs[0]]})' })
  } else if(refs[0] === 'dark' || refs[0] === 'light' || refs[0] === 'reduce') {
    obj['screen'] = postcss.AtRule({ name: 'media', params: opts.prefers[refs[0]] })
  } else if(refs[0] === 'print' || refs[0] === 'screen') {
    obj['screen'] = postcss.AtRule({ name: 'media', params: refs[0] })
  } else {
    obj['coloring'] = ''
    obj['spacing'] = ''
    
    const cls = refs[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().trim().split('-').filter(i => i !== '')
    
    if(Object.keys(opts.color).includes(cls[0])) {
      if(cls[1] === 'outlined') {
        objRule['coloring'] = {
          'color': opts.color[cls[0]],
          'background-color': 'transparent',
          'border-color': opts.color[cls[0]]
        }
      } else {
        obj['coloring'] = {
          'color': (cls[0] !== 'white' && cls[0] !== 'yellow' && cls[0] !== 'warning') ? '#fff' : '#333',
          'background-color': opts.color[cls[0]],
          'border-color': opts.color[cls[0]]
        }
      }
      
      if(isNaN(refs[1]) === false) {
        state.alpha = Number('0.'+ refs[1])
      }
    } else if(Object.keys(sizing).includes(cls[0])) {
      if(cls[1] === 'auto') {
        arr.push(postcss.decl({ prop: sizing[cls[0]], value: 'auto' }))
      } else {
        if(typeof refs[1] === 'string') {
          arr.push(postcss.decl({ prop: sizing[cls[0]], value: unitUtil(refs[1], unit.length, '%', 1) }))
        }
      }
    }
  }
  
  if(typeof obj['coloring'] === 'object' && obj['coloring'] !== null) {
    for(let [key, val] of Object.entries(obj['coloring'])) {
      arr.push(postcss.decl({ prop: key, value: (typeof val !== 'string') ? colorUtil(val, state.alpha) : val }))
    }
  }
  
  return arr
}
