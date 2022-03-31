//const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const rules = require('./rules.js')

function readPath(rp) {
  const content = []
  const data = fs.readFileSync(rp, 'utf8')
  let regexp, replaceData
  if(rp.endsWith('.vue')) {
    regexp = /(v-bind:class|:class|class)="([\w]+|[\s\w]+|[\s\w\-_\.:\d\(\)]+)"/g
    replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/:\s/ig, '')
  } else if(rp.endsWith('.svelte')) {
    regexp = /class:([\w]+|[\s\w]+|[\s\w\-_.:\d\(\)]+)\s/g
    replaceData = data.replace(/=|\>/ig, ' ')
  } else { //.html, .astro, .edge, .blade.php, .twig
    regexp = /(v-bind:class|x-bind:class|:class|class)="([\w]+|[\s\w]+|[\s\w\-_\.:\d\(\)]+)"/g
    replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/:\s/ig, '')
  }
  if(regexp !== undefined && replaceData !== undefined) {
    const classes = [...replaceData.matchAll(regexp)].flat().filter(i => i.indexOf('class') === -1)
    const uniqClasses = Array.from(new Set(classes.map(i => i.split(' ')).flat())).filter(i => i !== '')
    content.push(...uniqClasses)
  }
  return content
}

module.exports = (paths, options) => {
  let extract = []
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      extract = extract.concat(readPath(file))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          extract = extract.concat(readPath(file))
        }
      }
    }
  }
  
  const newExtract = []
  for(let ref of Array.from(new Set(extract))) {
    newExtract.push(...rules(ref, options))
  }
  
  return newExtract
}
