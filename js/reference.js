const postcss = require('postcss')
const unit = require('./props/unit.js')
const sizing = require('./props/sizing.js')
const spacing = require('./props/spacing.js')
const single = require('./props/single.js')
const double = require('./props/double.js')
const triple = require('./props/triple.js')
const indexing = require('./props/indexing.js')
const grid = require('./props/grid.js')
const colorUtil = require('./utils/color-util.js')
const unitUtil = require('./utils/unit-util.js')

const rightLeft = ['right', 'left']
const topBottom = ['top', 'bottom']

function reference(nameArg, valueArg, opts) {
  const arr = []
  const state = {
    alpha: 1
  }
  const cls = nameArg.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z])/g, '$1-$2').toLowerCase().trim().split('-').filter(i => i !== '')
  
  if(Object.keys(opts.color).includes(cls[0])) {
    let colored = {}
    if(cls[1] === 'outlined') {
      colored = {
        'color': opts.color[cls[0]],
        'background-color': 'transparent',
        'border-color': opts.color[cls[0]]
      }
    } else {
      colored = {
        'color': (cls[0] !== 'white' && cls[0] !== 'yellow' && cls[0] !== 'warning') ? '#fff' : '#333',
        'background-color': opts.color[cls[0]],
        'border-color': opts.color[cls[0]]
      }
    }
      
    if(isNaN(valueArg) === false) {
      state.alpha = Number('0.'+ valueArg)
    }
      
    for(let [key, val] of Object.entries(colored)) {
      arr.push(postcss.decl({ prop: key, value: (typeof val !== 'string') ? colorUtil(val, state.alpha) : val }))
    }
  } else if(Object.keys(sizing).includes(cls[0])) {
    if(cls[1] === 'auto') {
      arr.push(postcss.decl({ prop: sizing[cls[0]], value: 'auto' }))
    } else {
      if(typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: sizing[cls[0]], value: unitUtil(valueArg, unit.length, '%', 1) }))
      }
    }
  } else if([...rightLeft, ...topBottom].includes(cls[0])) {
    if(cls[1] === 'auto') {
      arr.push(postcss.decl({ prop: [...rightLeft, ...topBottom][cls[0]], value: 'auto' }))
    } else {
      if(typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: [...rightLeft, ...topBottom][cls[0]], value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
      }
    }
  } else if(Object.keys(spacing).includes(cls[0])) {
    if(cls[1] === 'x') {
      if(cls[0] === 'mg' && cls[2] === 'auto') {
        arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-right`, value: 'auto' }))
        arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-left`, value: 'auto' }))
      } else {
        if(typeof valueArg === 'string') {
          arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-right`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
          arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-left`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
        }
      }
    } else if(cls[1] === 'y') {
      if(cls[0] === 'mg' && cls[2] === 'auto') {
        arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-top`, value: 'auto' }))
        arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-bottom`, value: 'auto' }))
      } else {
        if(typeof valueArg === 'string') {
          arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-top`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
          arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-bottom`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
        }
      }
    } else if([...rightLeft, ...topBottom].includes(cls[1])) {
      if(cls[0] === 'mg' && cls[2] === 'auto') {
        arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-${cls[1]}`, value: 'auto' }))
      } else {
        if(typeof valueArg === 'string') {
          arr.push(postcss.decl({ prop: `${spacing[cls[0]]}-${cls[1]}`, value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
        }
      }
    } else {
      if(cls[0] === 'mg' && cls[1] === 'auto') {
        arr.push(postcss.decl({ prop: spacing[cls[0]], value: 'auto' }))
      } else {
        if(typeof valueArg === 'string') {
          arr.push(postcss.decl({ prop: spacing[cls[0]], value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
        }
      }
    }
  } else if(cls[0] === 'gap') {
    if(cls[1] === 'x') {
      if(typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: 'column-gap', value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
      }
    } else if(cls[1] === 'y') {
      if(typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: 'row-gap', value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
      }
    } else {
      if(typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: 'gap', value: unitUtil(valueArg, unit.length, 'rem', 0.25) }))
      }
    }
  } else if(Object.keys(single).includes(cls[0])) {
    arr.push(postcss.decl({ prop: single[cls[0]].key, value: single[cls[0]].val }))
  } else if(Object.keys(double).includes(cls[0])) {
    if(Object.keys(double[cls[0]].val).includes(cls[1])) {
      arr.push(postcss.decl({ prop: double[cls[0]].key, value: double[cls[0]].val[cls[1]] }))
    } else {
      if(double[cls[0]].val.base) {
        arr.push(postcss.decl({ prop: double[cls[0]].key, value: double[cls[0]].val.base }))
      }
    }
  } else if(Object.keys(triple).includes(cls[0])) {
    if(Object.keys(triple[cls[0]]).includes(cls[1])) {
      if(typeof triple[cls[0]][cls[1]].val === 'string') {
        arr.push(postcss.decl({ prop: triple[cls[0]][cls[1]].key, value: triple[cls[0]][cls[1]].val }))
      } else if(Object.keys(triple[cls[0]][cls[1]].val).includes(cls[2])) {
        arr.push(postcss.decl({ prop: triple[cls[0]][cls[1]].key, value: triple[cls[0]][cls[1]].val[cls[2]] }))
      } else {
        if(triple[cls[0]][cls[1]].val.base) {
          arr.push(postcss.decl({ prop: triple[cls[0]][cls[1]].key, value: triple[cls[0]][cls[1]].val.base }))
        }
      }
    }
  } else if(cls[0] === 'grid') {
    const decl1 = postcss.decl({ prop: 'display', value: 'grid' })
    if(Object.keys(grid.template).includes(cls[1])) {
      if(isNaN(valueArg) === false) {
        const decl2 = postcss.decl({ prop: grid.template[cls[1]], value: `repeat(${valueArg}, minmax(0px, 1fr))` })
        arr.push(decl1, decl2)
      } else if(cls[2] === 'none') {
        const decl2 = postcss.decl({ prop: grid.template[cls[1]], value: 'none' })
        arr.push(decl1, decl2)
      }
    } else {
      arr.push(decl1)
    }
  } else if(Object.keys(grid.template).includes(cls[0])) {
    if(isNaN(valueArg) === false) {
      arr.push(postcss.decl({ prop: grid.template[cls[0]], value: `repeat(${valueArg}, minmax(0px, 1fr))` }))
    } else if(cls[1] === 'none') {
      arr.push(postcss.decl({ prop: grid.template[cls[0]], value: 'none' }))
    }
  } else if(Object.keys(grid.span).includes(cls[0])) {
    if(cls[1] === 'span') {
      if(isNaN(valueArg) === false) {
        arr.push(postcss.decl({ prop: grid.span[cls[0]], value: `span ${valueArg} / span ${valueArg}` }))
      } else if(cls[1] === 'full') {
        arr.push(postcss.decl({ prop: grid.span[cls[0]], value: '1 / -1' }))
      }
    } else if(['start', 'end'].includes(cls[1])) {
      if(isNaN(valueArg) === false) {
        arr.push(postcss.decl({ prop: `${grid.span[cls[0]]}-${cls[1]}`, value: valueArg }))
      } else if(cls[1] === 'auto') {
        arr.push(postcss.decl({ prop: `${grid.span[cls[0]]}-${cls[1]}`, value: 'auto' }))
      }
    }
  } else if(Object.keys(indexing).includes(cls[0])) {
    const indVal = valueArg.replace(',', '.')
    if(isNaN(indVal) === false) {
      arr.push(postcss.decl({ prop: indexing[cls[0]], value: indVal }))
    }
  }
  return arr
}

module.exports = (ref, opts) => {
  let arr = []
  const obj = {}
  
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
    arr = arr.concat(reference(refs[0], refs[1], opts))
  }
  
  return arr
}
