const postcss = require('postcss')
const camelDash = require('../helpers/camelDash.js')
const flatScreen = require('../helpers/flatScreen.js')
const value = require('./value.js')

module.exports = (obj, ref, opts) => {
  let newObj = Object.assign({}, obj)
  
  const refs = ref.trim().split(/-|:/).filter(i => i !== '')
  
  if(Number(refs.length) === 3) {
    if('preset' in opts && Object.keys(opts.preset).includes(refs[1])) {
      refs[1] = opts.preset[refs[1]]
    }
    
    const newScreen = Object.assign({}, flatScreen(opts.screen))
    if(Object.keys(newScreen).includes(refs[0])) {
      if(!newObj[refs[0]]) {
        if(newScreen[refs[0]].minmax === 'max') {
          newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(max-width: ${newScreen[refs[0]].size})` })
        } else {
          newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(min-width: ${newScreen[refs[0]].size})` })
        }
      }
      
      const newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll('/', '\\/') })
      const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
      newRule.append(declVal)
      
      newObj[refs[0]].append(newRule)
    } else if(Object.keys(opts.prefers).includes(refs[0])) {
      if(!newObj[refs[0]]) {
        newObj[refs[0]] = postcss.atRule({ name: 'media', params: `(${opts.prefers[refs[0]].media}: ${opts.prefers[refs[0]].prefers})` })
      }
      
      let newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll('/', '\\/') })
      if(opts.prefers[refs[0]]?.selector) {
        newRule = postcss.rule({ selector: opts.prefers[refs[0]].selector+' .'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll('/', '\\/') })
      }
      const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
      newRule.append(declVal)
      
      newObj[refs[0]].append(newRule)
    }
  }
  
  return newObj
}
