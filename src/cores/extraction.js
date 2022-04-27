const glob = require('glob')
const fs = require('fs')
const rules = require('./rules.js')

function readPath(rp) {
  const content = []
  const data = fs.readFileSync(rp, 'utf8')
  let regexp, replaceData, classes
  if(rp.endsWith('.vue')) {
    //regexp = /(v-bind:class|:class|class)="([\w]+|[\s\w]+|[\s\w\-_\.:\d\(\)]+)"/g
    //replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/:\s/ig, '')
    //classes = replaceData.replace(/class="|"/g, '').split(' ').filter(i => i.includes('-'))
    regexp = /(?<=class=").*?(?=")/gs
    replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/\s+/ig, ',')
    classes = [...replaceData.matchAll(regexp)].map(i => i[0].split(',').filter(w => w !== '')).flat(2).filter(i => i.includes('-'))
  } else if(rp.endsWith('.svelte')) {
    regexp = /class:([\w]+|[\s\w]+|[\s\w\-_.:\d\(\)]+)\s/g
    replaceData = data.replace(/=|\>/ig, ' ')
    classes = [...replaceData.matchAll(regexp)].flat().filter(i => i.indexOf('class') === -1)
  } else { //.html, .astro, .edge, .blade.php, .twig
    regexp = /(v-bind:class|x-bind:class|:class|class)="([\w]+|[\s\w]+|[\s\w\-_\.:\d\(\)]+)"/g
    replaceData = data.replace(/\[|\]|',|,\s|'|\(|\)|\<|\>|\{|\}/ig, ' ').replace(/:\s/ig, '')
    classes = [...replaceData.matchAll(regexp)].flat().filter(i => i.indexOf('class') === -1)
  }
  if(classes) {
    const uniqClasses = Array.from(new Set(classes.map(i => i.split(' ')).flat())).filter(i => i !== '')
    content.push(...uniqClasses)
  }
  return content.filter(i => i.includes('-'))
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
