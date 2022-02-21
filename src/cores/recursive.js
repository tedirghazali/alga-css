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
        splitRefs = node.prop.split('-')[1]
        splitRefsObj = {}
        splitRefsObj[camelDash(splitRefs)] = node.value
        recursiveObj[param] = Object.assign({}, recursiveObj[param], splitRefsObj)
      } else if(node.type === 'decl' && node.prop.startsWith('props-')) {
        splitProps = node.prop.split('-')[1]
        splitPropsObj = {}
        splitPropsObj[camelDash(splitProps)] = '{'+node.value+'}'
        recursiveObj[param] = Object.assign({}, recursiveObj[param], splitPropsObj)
      } else if(node.type === 'decl' && node.prop === 'inject') {
        recursiveObj[param] = Object.assign({}, recursiveObj[param], opt.provide[node.value])
      } else if(node.type === 'decl' && node.prop.startsWith('screen-')) {
        screenObj = {}
        screenObj[node.prop] = Object.assign({}, screenObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], screenObj)
      } else if(node.type === 'decl' && node.prop.startsWith('state-')) {
        stateObj = {}
        stateObj[node.prop] = Object.assign({}, stateObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], stateObj)
      } else if(node.type === 'decl' && node.prop.startsWith('prefers-')) {
        prefersObj = {}
        prefersObj[node.prop] = Object.assign({}, prefersObj[node.prop], reference(node.value))
        recursiveObj[param] = Object.assign({}, recursiveObj[param], prefersObj)
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
