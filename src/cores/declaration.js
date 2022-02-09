const postcss = require('postcss')

module.exports = (body, props) => {
  let ruleArray = []
  
  for(let item of body) {
    const itemKey = Object.keys(item)[0]
    const itemValues = Object.entries(item[itemKey])
    const newRule = postcss.rule({ selector: itemKey })
    for(let [key, val] of itemValues) {
      if(typeof val === 'string') {
        const declVal = postcss.decl({ prop: key.trim(), value: val.trim() })
        newRule.append(declVal)
      }
    }
    ruleArray.push(newRule)
  }
  return ruleArray
}
