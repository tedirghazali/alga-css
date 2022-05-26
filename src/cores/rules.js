const postcss = require('postcss')
const camelDash = require('../helpers/camelDash.js')
const value = require('./value.js')

module.exports = (ref, opts) => {
  let arr = []
  
  const refs = ref.trim().split(/-|:/).filter(i => i !== '')
  
  if(Number(refs.length) === 3) {
    if('preset' in opts && Object.keys(opts.preset).includes(refs[1])) {
      refs[1] = opts.preset[refs[1]]
    }
    
    if(Object.keys(opts.state).includes(refs[0])) {
      const newRule = postcss.rule({ selector: '.'+ref.replaceAll(':', '\\:').replaceAll('.', '\\.').replaceAll('/', '\\/')+''+opts.state[refs[0]].state })
      const declVal = postcss.decl({ prop: camelDash(refs[1]), value: value(refs[2]) })
      newRule.append(declVal)
      
      arr.push(newRule)
    }
  } else if(Number(refs.length) === 2) {
    // Switch from preset to real property like m to margin
    if('preset' in opts && Object.keys(opts.preset).includes(refs[0])) {
      refs[0] = opts.preset[refs[0]]
    }
    
    const newRule = postcss.rule({ selector: '.'+ref.replaceAll('.', '\\.').replaceAll('/', '\\/') })
    const declVal = postcss.decl({ prop: camelDash(refs[0]), value: value(refs[1]) })
    newRule.append(declVal)
    
    arr.push(newRule)
  }
  
  return arr
}
