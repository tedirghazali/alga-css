const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const reference = require('./reference.js')

function readPath(rp, opts) {
  const provide = {}
  const data = fs.readFileSync(rp, 'utf8')
  const root = postcss.parse(data)
  for(let rnode of root.nodes) {
    if(rnode.type === 'atrule' && rnode.name === 'provide') {
      const param = rnode.params.trim()
      if(param) {
        const selectNodes = []
        for(let node of rnode.nodes) {
          if(node.type === 'atrule' && node.name === 'prefers') {
            const prefersParam = node.params.trim()
            if(opts.prefers[prefersParam]) {
              const media = postcss.atRule({name: 'media', params: opts.prefers[prefersParam]})
              media.append(node.nodes)
              selectNodes.push(media)
            } else {
              node.remove()
            }
          } else if(node.type === 'atrule' && node.name === 'screen') {
            const screenParam = node.params.trim()
            if(opts.screen[screenParam]) {
              const media = postcss.atRule({name: 'media', params: `(min-width: ${opts.screen[screenParam]})`})
              media.append(node.nodes)
              selectNodes.push(media)
            } else {
              node.remove()
            }
          } else if(node.type === 'atrule' && node.name === 'get') {
            const getParam = node.params.trim()
            if(opts.define[getParam]) {
              const setRule = postcss.rule({selector: '.'+getParam})
              setRule.append(...opts.define[getParam])
              if(node.nodes) {
                for(let getNode of node.nodes) {
                  if(getNode.type === 'decl' && getNode.prop === 'emit') {
                    const refs = getNode.value.trim() ? Array.from(new Set(getNode.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
                    for(let ref of refs) {
                      setRule.append(...reference(ref, {screen: config.screen, prefers: config.prefers, color: config.color, preset: config.preset}))
                    }
                  }
                }
              }
              selectNodes.push(setRule)
            } else {
              node.remove()
            }
          } if(node.type === 'rule') {
            const setRule = postcss.rule({selector: node.selector})
            if(node.nodes) {
              for(let nd of node.nodes) {
                if(nd.type === 'decl' && nd.prop === 'props') {
                  if(opts.define[nd.value.trim()] !== undefined) {
                    setRule.append(...opts.define[nd.value.trim()])
                  }
                } else if(nd.type === 'decl' && nd.prop === 'ref') {
                  const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
                  for(let ref of refs) {
                    setRule.append(...reference(ref, {screen: opts.screen, prefers: opts.prefers, color: opts.color, preset: opts.preset}))
                  }
                } else {
                  setRule.append(nd)
                }
              }
            }
            selectNodes.push(setRule)
          } else {
            selectNodes.push(node)
          }
        }
        provide[param] = selectNodes
      }
    }
  }
  
  return provide
}

module.exports = (paths, opts) => {
  let provide = {}
  
  const coreFiles = fs.readdirSync(__dirname.toString().replace('js', 'css') + '/provides/')
  if(coreFiles) {
    for(let file of coreFiles) {
      provide = Object.assign({}, provide, readPath(__dirname.toString().replace('js', 'css') + '/provides/' + file, opts))
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      provide = Object.assign({}, provide, readPath(file, opts))
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          provide = Object.assign({}, provide, readPath(file, opts))
        }
      }
    }
  }
  
  return provide
}
