const postcss = require('postcss')
const reference = require('./reference.js')

module.exports = (ref, opts) => {
  let arr = []
  
  const refs = ref.trim().split(/\||-|_|:/).filter(i => i !== '')
  
  if(Object.keys(opts.preset).includes(refs[0])) {
    refs[0] = opts.preset[refs[0]]
  }
  
  if(Object.keys(opts.screen).includes(refs[0])) {
    const newAtRule = postcss.atRule({ name: 'media', params: '(min-width: ${opts.screen[refs[0]]})' })
    const newRule = postcss.rule({ selector: '.'+ref.trim().replace('.', '\\.').replace(':', '\\:').replace(',', '\\,').replace('|', '\\|').replace('(', '\\(').replace(')', '\\)') })
    newRule.append(...reference(refs[1], refs[2] ? refs[2] : '', opts))
    newAtRule.append(newRule)
    arr.push(newAtRule)
  } else if(Object.keys(opts.prefers).includes(refs[0])) {
    const newAtRule = postcss.atRule({ name: 'media', params: opts.prefers[refs[0]] })
    const newRule = postcss.rule({ selector: '.'+ref.trim().replace('.', '\\.').replace(':', '\\:').replace(',', '\\,').replace('|', '\\|').replace('(', '\\(').replace(')', '\\)') })
    newRule.append(...reference(refs[1], refs[2] ? refs[2] : '', opts))
    newAtRule.append(newRule)
    arr.push(newAtRule)
  } else if(refs[0] === 'print' || refs[0] === 'screen') {
    const newAtRule = postcss.atRule({ name: 'media', params: refs[0] })
    const newRule = postcss.rule({ selector: '.'+ref.trim().replace('.', '\\.').replace(':', '\\:').replace(',', '\\,').replace('|', '\\|').replace('(', '\\(').replace(')', '\\)') })
    newRule.append(...reference(refs[1], refs[2] ? refs[2] : '', opts))
    newAtRule.append(newRule)
    arr.push(newAtRule)
  } else {
    if(reference(refs[0], refs[1] ? refs[1] : '', opts).length >= 1) {
      const newRule = postcss.rule({ selector: '.'+ref.trim().replace('.', '\\.').replace(':', '\\:').replace(',', '\\,').replace('|', '\\|').replace('(', '\\(').replace(')', '\\)') })
      newRule.append(...reference(refs[0], refs[1] ? refs[1] : '', opts))
      arr.push(newRule)
    }
  }
  
  return arr
}
