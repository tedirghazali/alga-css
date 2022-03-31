const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const declaration = require('./declaration.js')

function readPath(rp, defs, opts) {
  const define = {}
  const data = fs.readFileSync(rp, 'utf8')
  const root = postcss.parse(data)
  for(let node of root.nodes) {
    if(node.type === 'atrule' && node.name === 'set') {
      const selectNodes = []
      const clsNames = Array.from(node.nodes)
      for(let cls of clsNames) {
        if(cls.type === 'decl' && cls.prop === 'props') {
          if(typeof cls.params === 'string' && defs[cls.value.trim()]) {
            selectNodes.push(...defs[cls.value.trim()])
          }
        } else if(cls.type === 'decl' && cls.prop === 'ref') {
          const refs = cls.value.trim() ? Array.from(new Set(cls.value.trim().split(/\s/).filter(i => i !== ''))) : []
          for(let ref of refs) {
            selectNodes.push(...declaration(ref, opts))
          }
        } else {
          selectNodes.push(cls)
        }
      }
      define[node.params.trim()] = selectNodes
    }
  }
  return define
}

module.exports = (paths, opts) => {
  let define = {}
  
  const coreFiles = fs.readdirSync(__dirname.toString().replace('js', 'css') + '/defines/')
  if(coreFiles) {
    for(let file of coreFiles) {
      if(file.endsWith('set.css') || file.endsWith('.css')) {
        define = Object.assign({}, define, readPath(__dirname.toString().replace('js', 'css') + '/defines/' + file, define, opts))
      }
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      if(file.endsWith('set.css') || file.endsWith('.css')) {
        define = Object.assign({}, define, readPath(file, define, opts))
      }
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          if(file.endsWith('set.css') || file.endsWith('.css')) {
            define = Object.assign({}, define, readPath(file, define, opts))
          }
        }
      }
    }
  }
  
  return define
}
