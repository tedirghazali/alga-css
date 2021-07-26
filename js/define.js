const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const reference = require('./reference.js')

function readPath(rp, defs, opts) {
  const define = {}
  const data = fs.readFileSync(rp, 'utf8')
  const root = postcss.parse(data)
  for(let node of root.nodes) {
    if(node.name === 'set') {
      const selectNodes = []
      for(let node of node.nodes) {
        if(node.name = 'props') {
          if(defs[node.params.trim()]) {
            selectNodes.push(...defs[node.params.trim()])
          }
        } else if(node.name = 'ref') {
          const getRefs = node.params.trim() ? Array.from(new Set(node.params.trim().split(/\s|\|/).filter(i => i !== ''))) : []
          selectNodes.push(...reference(...getRefs, opts))
        } else {
          selectNodes.push(node)
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
      define = Object.assign({}, define, readPath(__dirname.toString().replace('js', 'css') + '/defines/' + file, define, opts))
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      define = Object.assign({}, define, readPath(file, define, opts))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          define = Object.assign({}, define, readPath(file, define, opts))
        }
      }
    }
  }
  
  return define
}
