const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const rules = require('./rules.js')

function readPath(rp, opts) {
  const regexp = /(v-bind:class|x-bind:class|:class|class)=\"([\w]+|[\s\w]+|[\s\w\-\_\.\:\d\(\)]+)\"/g
  const content = []
  const data = fs.readFileSync(rp, 'utf8')
  const classes = [...data.matchAll(regexp)].flat().filter(i => i.indexOf('class') === -1)
  const uniqClasses = Array.from(new Set(classes.map(i => i.split(' ')).flat()))
  for(let ref of uniqClasses) {
    content.push(...rules(ref, opts))
  }
  return content
}

module.exports = (paths, options) => {
  let extract = []
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      extract = extract.concat(readPath(file, options))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          extract = extract.concat(readPath(file, options))
        }
      }
    }
  }
  
  return extract
}
