const screen = require('../configs/screen.js')
const camelDash = require('../helpers/camelDash.js')
const reference = require('./reference.js')
const selector = require('./selector.js')

function recursiveFunc(root, prm, opt = {}) {
  let param = (root.type === 'rule') ? selector(root, prm) : ''
  const recursiveArr = []
  const recursiveObj = {}
  recursiveObj[param] = {}
  if('nodes' in root && Array.isArray(root.nodes) && root.nodes.length >= 1) {
    for(let node of root.nodes) {
      if(node.type === 'decl' && node.prop === 'ref') {
        recursiveObj[param] = Object.assign({}, recursiveObj[param], reference(node.value))
      } else if(node.type === 'decl' && node.prop.startsWith('ref-')) {
        let splitRefs = node.prop.split('-')[1]
        let splitRefsObj = {}
        splitRefsObj[camelDash(splitRefs)] = node.value
        recursiveObj[param] = Object.assign({}, recursiveObj[param], splitRefsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('props-')) {
        let splitProps = node.prop.split('-')[1]
        let splitPropsObj = {}
        splitPropsObj[camelDash(splitProps)] = '{'+node.value+'}'
        recursiveObj[param] = Object.assign({}, recursiveObj[param], splitPropsObj)
      } else if(node.type === 'decl' && node.prop === 'inject') {
        recursiveObj[param] = Object.assign({}, recursiveObj[param], opt.provide[node.value])
      } else if(node.type === 'decl' && node.prop === 'inject-props') {
        let injectPropsObj = {}
        injectPropsObj['inject-'+node.value] = node.value
        recursiveObj[param] = Object.assign({}, recursiveObj[param], injectPropsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('screen-')) {
        let screenObj = {}
        screenObj[node.prop] = Object.assign({}, screenObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], screenObj)
      } else if(node.type === 'decl' && node.prop.startsWith('state-')) {
        let stateObj = {}
        stateObj[node.prop] = Object.assign({}, stateObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], stateObj)
      } else if(node.type === 'decl' && node.prop.startsWith('prefers-')) {
        let prefersObj = {}
        prefersObj[node.prop] = Object.assign({}, prefersObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], prefersObj)
      } else if(node.type === 'decl' && node.prop.startsWith('if-')) {
        let conditionalObj = {}
        conditionalObj[node.prop] = Object.assign({}, conditionalObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], conditionalObj)
      } else if(node.type === 'atrule' && node.name === 'if' && 'nodes' in node) {
        const paramConditional = node.params.split('in')
        const valueConditional = paramConditional[0]?.trim() || ''
        const propsConditional = paramConditional[1]?.trim() || ''
        let conditionalObj = {}
        for(let condVal of node.nodes) {
          if(condVal.type === 'decl' && condVal.prop === 'ref') {
            conditionalObj['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj['if-'+propsConditional+'-'+valueConditional], reference(condVal))
          } else if(condVal.type === 'decl' && condVal.prop.startsWith('ref-')) {
            let splitRefs = condVal.prop.split('-')[1]
            let splitRefsObj = {}
            splitRefsObj[camelDash(splitRefs)] = condVal.value
            conditionalObj['if-'+propsConditional+'-'+valueConditional] = Object.assign({}, conditionalObj['if-'+propsConditional+'-'+valueConditional], splitRefsObj)
          }
        }
        recursiveObj[param] = Object.assign({}, recursiveObj[param], conditionalObj)
      } else if(node.type === 'rule') {
        for(let par of param.split(',')) {
          recursiveArr.push(recursiveFunc(node, par.trim(), opt))
        }
      }
    }
    recursiveArr.unshift(recursiveObj)
  }
  return recursiveArr
}

module.exports = (node, opt = {}) => {
  return { body: Array.from(recursiveFunc(node, '', opt)).flat(Infinity)}
}
