const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')

function readPath(rp) {
  const regexp = /class=\"([\w]+|[\s\w]+|[\s\w\-\_\.\:\d\(\)]+)\"/g
  const content = {}
  const data = fs.readFileSync(rp, 'utf8')
  const classes = [...data.matchAll(regexp)].flat().filter(i => i.indexOf('class=') === -1)
  const uniqClasses = Array.from(new Set(classes.map(i => i.split(' ')).flat()))
  console.log(uniqClasses)
  /*const root = postcss.parse(data)
  for(let node of root.nodes) {
    if(node.name === 'provide') {
      content[node.params.trim()] = node.nodes
    }
  }*/
  return content
}

module.exports = (paths) => {
  let extract = {}
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      extract = Object.assign({}, extract, readPath(file))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          extract = Object.assign({}, extract, readPath(file))
        }
      }
    }
  }
  
  return extract
}
