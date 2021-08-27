const postcss = require('postcss')
const unit = require('./props/unit.js')
const sizing = require('./props/sizing.js')
const spacing = require('./props/spacing.js')
const styling = require('./props/styling.js')
const indexing = require('./props/indexing.js')
const single = require('./props/single.js')
const double = require('./props/double.js')
const triple = require('./props/triple.js')
const grid = require('./props/grid.js')
const flex = require('./props/flex.js')
const colorUtil = require('./utils/color-util.js')
const unitUtil = require('./utils/unit-util.js')
const calcUtil = require('./utils/calc-util.js')
const isUtil = require('./utils/is-util.js')

const rightLeft = ['right', 'left']
const topBottom = ['top', 'bottom']
const sidePosition = [...topBottom, ...rightLeft]
const globalVal = ['inherit', 'initial', 'revert', 'unset']

module.exports = (nameArg, valueArg, opts) => { //function reference(nameArg, valueArg, opts) {
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
      
    if(valueArg !== '' && isNaN(valueArg) === false) {
      state.alpha = Number('0.'+ valueArg)
    }
      
    for(let [key, val] of Object.entries(colored)) {
      arr.push(postcss.decl({ prop: key, value: (typeof val !== 'string') ? colorUtil(val, state.alpha) : val }))
    }
  } else if(Object.keys(sizing).includes(cls[0])) {
    if(cls[1] === 'auto') {
      arr.push(postcss.decl({ prop: sizing[cls[0]], value: 'auto' }))
    } else {
      if(valueArg !== '') {
        if(isUtil.isCalc(valueArg)) {
          arr.push(postcss.decl({ prop: sizing[cls[0]], value: calcUtil(valueArg) }))
        } else {
          arr.push(postcss.decl({ prop: sizing[cls[0]], value: unitUtil(valueArg, unit.length, '%', 1) }))
        }
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
  } else if(cls[0] === 'area') {
    if(cls[1]) {
      let clsArea = cls[1]
      if(typeof cls[4] === 'string') {
        clsArea = `${cls[1]}-${cls[2]}-${cls[3]}-${cls[4]}`
      } else if(typeof cls[3] === 'string') {
        clsArea = `${cls[1]}-${cls[2]}-${cls[3]}`
      } else if(typeof cls[2] === 'string') {
        clsArea = `${cls[1]}-${cls[2]}`
      }
      arr.push(postcss.decl({ prop: 'grid-area', value: clsArea }))
    }
  } else if(Object.keys(indexing).includes(cls[0])) {
    const indVal = valueArg.replace(',', '.')
    if(isNaN(indVal) === false) {
      arr.push(postcss.decl({ prop: indexing[cls[0]], value: indVal }))
    }
  } else if(cls[0] === 'flex') {
    const decl1 = postcss.decl({prop: 'display', value: 'flex'})
    if(Object.keys(flex.justify).includes(cls[1])) {
      const decl2 = postcss.decl({prop: flex.justify[cls[1]].key, value: flex.justify[cls[1]].val})
      arr.push(decl1, decl2)
    } else if(cls[1] === 'items' && Object.keys(flex.items).includes(cls[2])) {
      const decl2 = postcss.decl({prop: flex.items[cls[2]].key, value: flex.items[cls[2]].val})
      arr.push(decl1, decl2)
    } else if(Object.keys(flex.attrs).includes(cls[1])) {
      if(typeof flex.attrs[cls[1]].val === 'string') {
        arr.push(postcss.decl({prop: flex.attrs[cls[1]].key, value: flex.attrs[cls[1]].val}))
      } else if(typeof flex.attrs[cls[1]].val === 'object' && Object.keys(flex.attrs[cls[1]].val).includes(cls[2])) {
        arr.push(postcss.decl({prop: flex.attrs[cls[1]].key, value: flex.attrs[cls[1]].val[cls[2]]}))
      } else {
        if(flex.attrs[cls[1]].val.base) {
          arr.push(postcss.decl({prop: flex.attrs[cls[1]].key, value: flex.attrs[cls[1]].val.base}))
        }
      }
    } else {
      if(valueArg !== '' && isNaN(valueArg) === false) {
        arr.push(postcss.decl({prop: 'flex', value: `${valueArg} 1 0px`}))
      } else {
        arr.push(decl1)
      }
    }
  } else if(cls[0] === 'bd') {
    if(cls[1] === 'collapse') {
      arr.push(postcss.decl({prop: 'border-collapse', value: 'collapse'}))
    } else if(cls[1] === 'color') {
      if(globalVal.includes(cls[2])) {
        arr.push(postcss.decl({prop: styling.bd.color, value: cls[2]}))
      } else if(isUtil.isColor(valueArg)) {
        arr.push(postcss.decl({prop: styling.bd.color, value: valueArg}))
      } else if(isUtil.isHex(valueArg)) {
        arr.push(postcss.decl({prop: styling.bd.color, value: valueArg.replace('hex(', '#').replace(')', '')}))
      }
    } else if(Object.keys(styling.bd.attrs).includes(cls[1])) {
      arr.push(postcss.decl({prop: styling.bd.attrs[cls[1]].key, value: styling.bd.attrs[cls[1]].val}))
      if(styling.bd.attrs[cls[1]].key === 'border-style' && valueArg !== '') {
        arr.push(postcss.decl({ prop: styling.bd.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    } else if(Object.keys(opts.color).includes(cls[1])) {
      let bdAlpha = 1
      if(valueArg !== '' && isNaN(valueArg) === false) {
        bdAlpha = Number('0.'+valueArg)
      }
      arr.push(postcss.decl({prop: styling.bd.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], bdAlpha) : opts.color[cls[1]]}))
    } else if(sidePosition.includes(cls[1])) {
      if(cls[2] === 'color') {
        if(globalVal.includes(cls[3])) {
          arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: cls[3]}))
        } else if(isUtil.isColor(valueArg)) {
          arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: valueArg}))
        } else if(isUtil.isHex(valueArg)) {
          arr.push(postcss.decl({prop: `border-${cls[1]}-color`, value: valueArg.replace('hex(', '#').replace(')', '')}))
        }
      } else if(Object.keys(styling.bd.attrs).includes(cls[2])) {
        if(styling.bd.attrs[cls[2]].key === 'border-style') {
          arr.push(postcss.decl({prop: `border-${cls[1]}-style`, value: styling.bd.attrs[cls[2]].val}))
          if(valueArg !== '') {
            arr.push(postcss.decl({ prop: `border-${cls[1]}-width`, value: unitUtil(valueArg, unit.length, 'px', 1) }))
          }
        } else if(styling.bd.attrs[cls[2]].key === 'border-width') {
          arr.push(postcss.decl({prop: `border-${cls[1]}-width`, value: styling.bd.attrs[cls[2]].val}))
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
    } else {
      if(valueArg !== '') {
        arr.push(postcss.decl({ prop: styling.bd.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    }
  } else if(cls[0] === 'outline') {
    if(cls[1] === 'offset') {
      if(typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: styling.outline.offset, value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    } else if(cls[1] === 'color') {
      if(globalVal.includes(cls[2])) {
        arr.push(postcss.decl({prop: styling.outline.color, value: cls[2]}))
      } else if(isUtil.isColor(valueArg)) {
        arr.push(postcss.decl({prop: styling.outline.color, value: valueArg}))
      } else if(isUtil.isHex(valueArg)) {
        arr.push(postcss.decl({prop: styling.outline.color, value: valueArg.replace('hex(', '#').replace(')', '')}))
      }
    } else if(Object.keys(styling.outline.attrs).includes(cls[1])) {
      arr.push(postcss.decl({prop: styling.outline.attrs[cls[1]].key, value: styling.outline.attrs[cls[1]].val}))
      if(styling.outline.attrs[cls[1]].key === 'outline-style' && typeof valueArg === 'string') {
        arr.push(postcss.decl({ prop: styling.outline.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    } else if(Object.keys(opts.color).includes(cls[1])) {
      let outlineAlpha = 1
      if(valueArg !== '' && isNaN(valueArg) === false) {
        outlineAlpha = Number('0.'+valueArg)
      }
      arr.push(postcss.decl({prop: styling.outline.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
    } else {
      if(valueArg !== '') {
        arr.push(postcss.decl({ prop: styling.outline.width, value: unitUtil(valueArg, unit.length, 'px', 1) }))
      }
    }
  } else if(cls[0] === 'txt') {
    if(Object.keys(styling.txt.position.val).includes(cls[1])) {
      if(typeof styling.txt.position.val[cls[1]] === 'string') {
        arr.push(postcss.decl({prop: styling.txt.position.key, value: styling.txt.position.val[cls[1]]}))
      }
    } else if(cls[1] === 'align') {
      if(globalVal.includes(cls[2])) {
        arr.push(postcss.decl({prop: styling.txt.position.key, value: cls[2]}))
      } else if(cls[2] === 'webkit') {
        arr.push(postcss.decl({prop: styling.txt.position.key, value: '-webkit-match-parent'}))
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
      arr.push(postcss.decl({prop: styling.txt.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
    }
  } else if(cls[0] === 'bg') {
    if(Object.keys(styling.bg.attrs).includes(cls[1])) {
      if(typeof styling.bg.attrs[cls[1]].val === 'string') {
        arr.push(postcss.decl({prop: styling.bg.attrs[cls[1]].key, value: styling.bg.attrs[cls[1]].val}))
      } else {
        if(Object.keys(styling.bg.attrs[cls[1]].val).includes(cls[2])) {
          arr.push(postcss.decl({prop: styling.bg.attrs[cls[1]].key, value: styling.bg.attrs[cls[1]].val[cls[2]]}))
        }
      }
    } else if(Object.keys(opts.color).includes(cls[1])) {
      let outlineAlpha = 1
      if(valueArg !== '' && isNaN(valueArg) === false) {
        outlineAlpha = Number('0.'+valueArg)
      }
      arr.push(postcss.decl({prop: styling.bg.color, value: (typeof opts.color[cls[1]] !== 'string') ? colorUtil(opts.color[cls[1]], outlineAlpha) : opts.color[cls[1]]}))
    } else if(['center', ...sidePosition].includes(cls[1])) {
      if(rightLeft.includes(cls[2])) {
        arr.push(postcss.decl({prop: styling.bg.position, value: `${cls[1]} ${cls[2]}`}))
      } else {
        arr.push(postcss.decl({prop: styling.bg.position, value: cls[1]}))
      }
    }
  }
  return arr
}

/*module.exports = (ref, opts) => {
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
    arr = arr.concat(reference(refs[0], refs[1] ? refs[1] : '', opts))
  }
  
  return arr
}*/
