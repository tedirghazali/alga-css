const postcss = require('postcss')
const flatScreen = require('../helpers/flatScreen.js')
const statusValue = require('../helpers/statusValue.js')

module.exports = (body, props, provide, opts) => {
  const screen = Object.assign({}, flatScreen(opts.screen))
  const state = Object.assign({}, statusValue(opts.state))
  const prefers = Object.assign({}, statusValue(opts.prefers))
  let ruleArray = []
  let atRuleArray = []
  
  for(let item of body) {
    const itemKey = Object.keys(item)[0]
    const itemValues = Object.entries(item[itemKey])
    const newRule = postcss.rule({ selector: itemKey })
    for(let [key, val] of itemValues) {
      if(typeof val === 'string') {
        if(key.trim().startsWith('inject-')) {
          for(let [keyInject, valInject] of Object.entries(provide[props[val]])) {
            let declVal = postcss.decl({ prop: keyInject.trim(), value: valInject.trim() })
            newRule.append(declVal)
          }
        } else {
          let declVal = undefined
          if(val.trim().startsWith('{') && val.trim().endsWith('}')) {
            let newDeclVal = val.replace('{', '').replace('}', '').trim()
            const splitDeclVal = newDeclVal.split(/\(|\)|\s|,/g).filter(i => i !== '')
            if(Number(splitDeclVal.length) === 1) {
              declVal = postcss.decl({ prop: key.trim(), value: props[newDeclVal] })
            } else {
              for(let splittedDecl of splitDeclVal) {
                if(props[splittedDecl]) {
                  newDeclVal = newDeclVal.replaceAll(splittedDecl, props[splittedDecl])
                }
              }
              declVal = postcss.decl({ prop: key.trim(), value: newDeclVal })
            }
          } else {
            declVal = postcss.decl({ prop: key.trim(), value: val.trim() })
          }
          newRule.append(declVal)
        }
      } else {
        const splitKey = key.split('-')
        if(splitKey.length >= 2) {
          if(Object.keys(screen).includes(splitKey[1])) {
            screen[splitKey[1]].value[itemKey] = Object.assign({}, screen[splitKey[1]].value[itemKey], val)
            screen[splitKey[1]].status = true
          } else if(Object.keys(state).includes(splitKey[1])) {
            state[splitKey[1]].value[itemKey] = Object.assign({}, state[splitKey[1]].value[itemKey], val)
            state[splitKey[1]].status = true
          } else if(Object.keys(prefers).includes(splitKey[1])) {
            prefers[splitKey[1]].value[itemKey] = Object.assign({}, prefers[splitKey[1]].value[itemKey], val)
            prefers[splitKey[1]].status = true
          }
        }
      }
    }
    ruleArray.push(newRule)
  }
  
  for(let [entryKey, entryVal] of Object.entries(screen)) {
    if(entryVal.status) {
      let newAtRule = undefined
      if(entryVal.minmax === 'max') {
        newAtRule = postcss.atRule({ name: 'media', params: `(max-width: ${entryVal.size})` })
      } else {
        newAtRule = postcss.atRule({ name: 'media', params: `(min-width: ${entryVal.size})` })
      }
      for(let [itemKey, itemValue] of Object.entries(entryVal.value)) {
        const newRule = postcss.rule({ selector: itemKey })
        for(let [key, val] of Object.entries(itemValue)) {
          if(typeof val === 'string') {
            let declVal = undefined
            if(val.trim().startsWith('{') && val.trim().endsWith('}')) {
              declVal = postcss.decl({ prop: key.trim(), value: props[val.replace('{', '').replace('}', '').trim()] })
            } else {
              declVal = postcss.decl({ prop: key.trim(), value: val.trim() })
            }
            newRule.append(declVal)
          }
        }
        newAtRule.append(newRule)
      }
      atRuleArray.push(newAtRule)
    }
  }
  
  return [...ruleArray, ...atRuleArray]
}
