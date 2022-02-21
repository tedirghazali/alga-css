const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const screen = require('../configs/screen.js')
const camelDash = require('../helpers/camelDash.js')
const reference = require('./reference.js')
const recursive = require('./recursive.js')

function readPath(rp, opts) {
  const component = {}
  const data = fs.readFileSync(rp, 'utf8')
  
  const splitFilePath = rp.split('/')[Number(rp.split('/').length) - 1]
  const splitFileName = splitFilePath.split('.')[0]
  let componentName = splitFileName
  component[componentName] = {}
  component[componentName]['modules'] = {}
  
  const root = postcss.parse(data)
  for(let rnode of root.nodes) {
    // Convert define into property
    if(rnode.type === 'atrule' && rnode.name === 'import') {
      const param = rnode.params.trim()
      const paramFilePaths = param.split(/\/|\./)
      const paramFileName = paramFilePaths[Number(paramFilePaths.length) - 2]
      component[componentName]['modules'] = Object.assign({}, component[componentName]['modules'], readPath(param, opts))
    } else if(rnode.type === 'atrule' && rnode.name === 'define' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const defineObj = {}
      for(let dnode of rnode.nodes) {
        defineObj[dnode.prop] = dnode.value
      }
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    // Get all provide and set a new property under provide
    } else if(rnode.type === 'atrule' && rnode.name === 'provide' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      const defineObj = {}
      defineObj[param] = {}
      for(let dnode of rnode.nodes) {
        // Extracting content of provide
        if(dnode.type === 'decl' && dnode.prop === 'ref') {
          defineObj[param] = Object.assign({}, defineObj[param], reference(dnode.value))
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('ref-')) {
          splitRefs = dnode.prop.split('-')[1]
          splitRefsObj = {}
          splitRefsObj[camelDash(splitRefs)] = dnode.value
          defineObj[param] = Object.assign({}, defineObj[param], splitRefsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('props-')) {
          splitProps = dnode.prop.split('-')[1]
          splitPropsObj = {}
          splitPropsObj[camelDash(splitProps)] = '{'+dnode.value+'}'
          defineObj[param] = Object.assign({}, defineObj[param], splitPropsObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('screen-')) {
          screenObj = {}
          screenObj[dnode.prop] = Object.assign({}, screenObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], screenObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('state-')) {
          stateObj = {}
          stateObj[dnode.prop] = Object.assign({}, stateObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], stateObj)
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('prefers-')) {
          prefersObj = {}
          prefersObj[dnode.prop] = Object.assign({}, prefersObj[dnode.prop], reference(dnode.value))
          defineObj[param] = Object.assign({}, defineObj[param], prefersObj)
        }
      }
      component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'alga' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      let defineObj = {}
      defineObj['header'] = {}
      for(let dnode of rnode.nodes) {
        if(dnode.type === 'decl' && dnode.prop === 'use') {
          defineObj['header'] = Object.assign({}, defineObj['header'], component[componentName]['modules'][dnode.value.trim()])
        } else {
          defineObj = Object.assign({}, defineObj, recursive(dnode, {
            'provide': component[componentName]['provide']
          })) 
        }
      }
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    }
  }
  return component
}

module.exports = (paths, opts) => {
  let component = {}
  
  const coreFiles = fs.readdirSync(__dirname.toString().replace('src/cores', 'alga') + '/')
  if(coreFiles) {
    for(let file of coreFiles) {
      if(file.endsWith('alga.css') || file.endsWith('.alga')) {
        component = Object.assign({}, component, readPath(__dirname.toString().replace('src/cores', 'alga') + '/' + file, opts))
      }
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      if(file.endsWith('alga.css') || file.endsWith('.alga')) {
        component = Object.assign({}, component, readPath(file, opts))
      }
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          if(file.endsWith('alga.css') || file.endsWith('.alga')) {
            component = Object.assign({}, component, readPath(file, opts))
          }
        }
      }
    }
  }
  
  return component
}
