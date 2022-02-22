const camelDash = require('../helpers/camelDash.js')
const value = require('./value.js')

module.exports = (ref, opt = {}) => {
  let references = {}
  const refs = ref.split(' ').filter(i => i !== '')
  for(let rf of refs) {
    const props = rf.trim().split(/-|:/).filter(i => i !== '')
  
    if(Number(props.length) === 3) {
    
    } else if(Number(props.length) === 2) {
      // Switch from preset to real property like m to margin
      if('preset' in opt && Object.keys(opt.preset).includes(props[0])) {
        props[0] = opt.preset[props[0]]
      }
      const refObj = {}
      refObj[camelDash(props[0])] = value(props[1])
      
      references = Object.assign({}, references, refObj)
    }
  }
  return references
}
