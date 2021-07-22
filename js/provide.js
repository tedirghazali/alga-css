const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')

function readPath(rp) {
  const provide = {}
  const data = fs.readFileSync(rp, 'utf8')
  const root = postcss.parse(data)
  for(let node of root.nodes) {
    if(node.name === 'provide') {
      provide[node.params.trim()] = node.nodes
    }
  }
  return provide
}

module.exports = (paths) => {
  let provide = {}
  
  const coreFiles = fs.readdirSync(__dirname.toString().replace('js', 'css') + '/provide/')
  if(coreFiles) {
    for(let file of coreFiles) {
      provide = Object.assign({}, provide, readPath(__dirname.toString().replace('js', 'css') + '/provide/' + file))
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      provide = Object.assign({}, provide, readPath(file))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          provide = Object.assign({}, provide, readPath(file))
        }
      }
    }
  }
  
  return provide
}
