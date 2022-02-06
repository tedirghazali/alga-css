const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
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
  
  const root = postcss.parse(data)
  for(let rnode of root.nodes) {
    // Convert define into property
    if(rnode.type === 'atrule' && rnode.name === 'define' && 'nodes' in rnode) {
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
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('props-')) {
          splitProps = dnode.prop.split('-')[1]
          splitPropsObj = {}
          splitPropsObj[camelDash(splitProps)] = '{'+dnode.value+'}'
          defineObj[param] = Object.assign({}, defineObj[param], splitPropsObj)
        }
      }
      console.log(defineObj[param])
      component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], defineObj)
    } else if(rnode.type === 'atrule' && rnode.name === 'alga' && 'nodes' in rnode) {
      const param = rnode.params.trim()
      let defineObj = {}
      defineObj['header'] = {}
      for(let dnode of rnode.nodes) {
        if(dnode.type === 'decl' && dnode.prop === 'ref') {
          defineObj['header'] = Object.assign({}, defineObj['header'], reference(dnode.value))
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('props-')) {
          splitProps = dnode.prop.split('-')[1]
          splitPropsObj = {}
          splitPropsObj[camelDash(splitProps)] = '{'+dnode.value+'}'
          defineObj['header'] = Object.assign({}, defineObj['header'], splitPropsObj)
        } else {
          defineObj['body'] = Object.assign({}, defineObj['body'], recursive(dnode)) 
        }
      }
      console.log(defineObj['body'])
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    }
  }
  console.log(component)
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
