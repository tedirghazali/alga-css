const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')

function readPath(rp, opts) {
  const define = {}
  const data = fs.readFileSync(rp, 'utf8')
  const root = postcss.parse(data)
  for(let node of root.nodes) {
    if(node.type === 'atrule' && node.name === 'component') {
      const selectNodes = []
      const clsNames = Array.from(node.nodes)
      for(let cls of clsNames) {
        if(cls.type === 'decl' && cls.prop === 'get') {
          if(opts.define[cls.value.trim()]) {
            const setRule = postcss.rule({selector: '.'+cls.value.trim()})
            setRule.append(...opts.define[cls.value.trim()])
            selectNodes.push(setRule)
          }
        } else if(cls.type === 'decl' && cls.prop === 'inject') {
          if(opts.provide[cls.value.trim()]) {
            selectNodes.push(opts.provide[cls.value.trim()])
          }
        }
      }
      define[node.params.trim()] = selectNodes
    }
  }
  return define
}

module.exports = (paths, opts) => {
  let define = {}
  
  const coreFiles = fs.readdirSync(__dirname.toString().replace('js', 'css') + '/components/')
  if(coreFiles) {
    for(let file of coreFiles) {
      if(file.endsWith('component.css') || file.endsWith('.css')) {
        define = Object.assign({}, define, readPath(__dirname.toString().replace('js', 'css') + '/components/' + file, opts))
      }
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      if(file.endsWith('component.css') || file.endsWith('.css')) {
        define = Object.assign({}, define, readPath(file, opts))
      }
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          if(file.endsWith('component.css') || file.endsWith('.css')) {
            define = Object.assign({}, define, readPath(file, opts))
          }
        }
      }
    }
  }
  
  return define
}
