const postcss = require('postcss')
const flatScreen = require('../helpers/flatScreen.js')
const statusValue = require('../helpers/statusValue.js')

const declaration = (body, defs, opts) => {
  const refs = defs.refs
  const props = defs.props
  const provide = defs.provide
  const screen = Object.assign({}, flatScreen(opts.screen))
  const state = Object.assign({}, statusValue(opts.state))
  const prefers = Object.assign({}, statusValue(opts.prefers))
  let ruleArray = []
  let atRuleArray = []
  
  for(let item of body) {
    const itemKey = Object.keys(item)[0]
    if(itemKey.startsWith('@if ')) {
      const itemValue = Object.values(item)[0]
      const ifKey = itemKey.replace('@if ', '')
      if(ifKey.includes(' is ')) {
        const splitKey = ifKey.trim().split(/\sis\s/g).filter(i => i !== '')
        if(
          (typeof props === 'object' && props !== null && splitKey[0].trim() in props && props[splitKey[0].trim()] === splitKey[1].trim()) ||
          (typeof refs === 'object' && refs !== null && splitKey[0].trim() in refs && refs[splitKey[0].trim()] === splitKey[1].trim())
        ) {
          ruleArray.push([
            ...declaration(itemValue, defs, opts)
          ])
        }
      } else if(ifKey.includes(' has ')) {
        const splitKey = ifKey.trim().split(/\shas\s/g).filter(i => i !== '')
        if(
          (typeof props === 'object' && props !== null && splitKey[0].trim() in props && props[splitKey[0].trim()].replaceAll(' ', '').split(',').filter(i => i !== '').includes(splitKey[1].trim())) ||
          (typeof refs === 'object' && refs !== null && splitKey[0].trim() in refs && refs[splitKey[0].trim()].replaceAll(' ', '').split(',').filter(i => i !== '').includes(splitKey[1].trim()))
        ) {
          ruleArray.push([
            ...declaration(itemValue, defs, opts)
          ])
        }
      }
    } else if(itemKey.startsWith('@keyframes ')) {
      const newAtRule = postcss.atRule({ name: 'keyframes', params: itemKey.replace('@keyframes ', '').trim() })
      const itemValue = Object.values(item)[0]
      newAtRule.append([...declaration(itemValue, defs, opts)])
      ruleArray.push(newAtRule)
    } else {
      const itemValues = Object.entries(item[itemKey])
      let selectorItemKey = itemKey
      if(selectorItemKey.includes('refs(') || selectorItemKey.includes('props(')) {
        selectorItemKey = itemKey
                          .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
                          .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
                          .split('<=>').map(i => {
          if(i.startsWith('refs===') || i.startsWith('props===')) {
            const arrowValues = i.split('===')
            i = defs[arrowValues[0]][arrowValues[1]] || `${arrowValues[0]}-${arrowValues[1]}`
          }
          return i
        }).filter(i => i !== '').join('')
      }
      const newRule = postcss.rule({ selector: selectorItemKey })
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
              declVal = postcss.decl({ prop: key.trim(), value: val.split(' ').map(i => {
                if(i.startsWith('refs(') || i.startsWith('props(')) {
                  const arrowValues = i.split(/\(|\)/g)
                  i = defs[arrowValues[0]][arrowValues[1]] || i
                }
                return i
              }).join(' ').trim() })
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
              state[splitKey[1]].value[itemKey] = Object.assign({}, state[splitKey[1]]['value'][itemKey], val)
              state[splitKey[1]].status = true
            } else if(Object.keys(prefers).includes(splitKey[1])) {
              prefers[splitKey[1]].value[itemKey] = Object.assign({}, prefers[splitKey[1]]['value'][itemKey], val)
              prefers[splitKey[1]].status = true
              
            }
          }
        }
      }
      
      if(newRule.nodes.length >= 1) {
        ruleArray.push(newRule)
      }
    }
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
        let selectorItemKey = itemKey
        if(selectorItemKey.includes('refs(') || selectorItemKey.includes('props(')) {
          selectorItemKey = itemKey
                            .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
                            .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
                            .split('<=>').map(i => {
            if(i.startsWith('refs===') || i.startsWith('props===')) {
              const arrowValues = i.split('===')
              i = defs[arrowValues[0]][arrowValues[1]] || `${arrowValues[0]}-${arrowValues[1]}`
            }
            return i
          }).filter(i => i !== '').join('')
        }
        const newRule = postcss.rule({ selector: selectorItemKey })
        for(let [key, val] of Object.entries(itemValue)) {
          if(typeof val === 'string') {
            let declVal = undefined
            if(val.trim().startsWith('{') && val.trim().endsWith('}')) {
              declVal = postcss.decl({ prop: key.trim(), value: props[val.replace('{', '').replace('}', '').trim()] })
            } else {
              declVal = postcss.decl({ prop: key.trim(), value: val.split(' ').map(i => {
                if(i.startsWith('refs(') || i.startsWith('props(')) {
                  const arrowValues = i.split(/\(|\)/g)
                  i = defs[arrowValues[0]][arrowValues[1]] || i
                }
                return i
              }).join(' ').trim() })
            }
            newRule.append(declVal)
          }
        }
        newAtRule.append(newRule)
      }
      atRuleArray.push(newAtRule)
    }
  }
  
  for(let [entryKey, entryVal] of Object.entries(prefers)) {
    if(entryVal.status) {
      let newAtRule = postcss.atRule({ name: 'media', params: `(${entryVal.media}: ${entryVal.prefers})` })
      for(let [itemKey, itemValue] of Object.entries(entryVal.value)) {
        let selectorItemKey = itemKey
        if(selectorItemKey.includes('refs(') || selectorItemKey.includes('props(')) {
          selectorItemKey = itemKey
                            .replaceAll(/refs\((\w+)\)/g, '<=>refs===$1<=>')
                            .replaceAll(/props\((\w+)\)/g, '<=>props===$1<=>')
                            .split('<=>').map(i => {
            if(i.startsWith('refs===') || i.startsWith('props===')) {
              const arrowValues = i.split('===')
              i = defs[arrowValues[0]][arrowValues[1]] || `${arrowValues[0]}-${arrowValues[1]}`
            }
            return i
          }).filter(i => i !== '').join('')
        }
        const newRule = postcss.rule({ selector: selectorItemKey })
        for(let [key, val] of Object.entries(itemValue)) {
          if(typeof val === 'string') {
            let declVal = undefined
            if(val.trim().startsWith('{') && val.trim().endsWith('}')) {
              declVal = postcss.decl({ prop: key.trim(), value: props[val.replace('{', '').replace('}', '').trim()] })
            } else {
              declVal = postcss.decl({ prop: key.trim(), value: val.split(' ').map(i => {
                if(i.startsWith('refs(') || i.startsWith('props(')) {
                  const arrowValues = i.split(/\(|\)/g)
                  i = defs[arrowValues[0]][arrowValues[1]] || i
                }
                return i
              }).join(' ').trim() })
            }
            newRule.append(declVal)
          }
        }
        newAtRule.append(newRule)
      }
      atRuleArray.push(newAtRule)
    }
  }
  
  return [...ruleArray.flat(), ...atRuleArray]
}

module.exports = declaration
