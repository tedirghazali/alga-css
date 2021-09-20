const reference = require('./reference.js')

module.exports = (ref, opts) => {
  let arr = []
  
  const refs = ref.trim().split(/\||-|_|:/).filter(i => i !== '')
  
  if(Object.keys(opts.preset).includes(refs[0])) {
    refs[0] = opts.preset[refs[0]]
  }
  
  if(!Object.keys(opts.screen).includes(refs[0]) && !Object.keys(opts.prefers).includes(refs[0]) && refs[0] !== 'print' && refs[0] !== 'screen') {
    arr = arr.concat(reference(refs[0], refs[1] ? refs[1] : '', opts))
  }
  
  return arr
}
