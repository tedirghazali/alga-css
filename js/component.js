const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')

function readPath(rp, opts) {
  const define = {}
  const data = fs.readFileSync(rp, 'utf8')
  const root = postcss.parse(data)
  for(let rnode of root.nodes) {
    if(rnode.type === 'atrule' && rnode.name === 'component') {
      const param = rnode.params.trim()
      if(param) {
        const selectNodes = []
        for(let node of rnode.nodes) {
          if(node.type === 'atrule') {
            if(node.name === 'get') {
              const getParam = node.params.trim()
              if(opts.define[getParam]) {
                const setRule = postcss.rule({selector: '.'+getParam})
                setRule.append(...opts.define[getParam])
                if(node.nodes) {
                  for(let getNode of node.nodes) {
                    if(getNode.type === 'decl' && getNode.prop === 'emit') {
                      const refs = getNode.value.trim() ? Array.from(new Set(getNode.value.trim().split(/\s/).filter(i => i !== ''))) : []
                      for(let ref of refs) {
                        setRule.append(...declaration(ref, opts))
                      }
                    }
                  }
                }
                selectNodes.push(setRule)
              } else {
                node.remove()
              }
            }
          } else if(node.type === 'rule') {
            const setRule = postcss.rule({selector: node.selector})
            const mediaDecl = []
            if(node.nodes) {
              for(let nd of node.nodes) {
                if(nd.type === 'decl' && nd.prop === 'props') {
                  if(opts.define[nd.value.trim()] !== undefined) {
                    setRule.append(opts.define[nd.value.trim()].join(';'))
                  }
                } else if(nd.type === 'decl' && nd.prop === 'ref') {
                  const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s/).filter(i => i !== ''))) : []
                  for(let ref of refs) {
                    setRule.append(...declaration(ref, opts))
                  }
                } else if(nd.type === 'decl' && nd.prop === 'screen') {
                  for(let [scrKey, scrVal] of Object.entries(opts.screen)) {
                    const setAtRule = postcss.atRule({name: 'media', params: `(min-width: ${scrVal})`})
                    const setNewRule = postcss.rule({selector: `.${scrKey}\\.${node.selector.replace('.', '')}`})
                    const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s/).filter(i => i !== ''))) : []
                    for(let ref of refs) {
                      setNewRule.append(...declaration(ref, opts))
                    }
                    setAtRule.append(setNewRule)
                    mediaDecl.push(setAtRule)
                  }
                } else if(nd.type === 'decl' && Object.keys(opts.screen).includes(nd.prop)) {
                  const setAtRule = postcss.atRule({name: 'media', params: `(min-width: ${opts.screen[nd.prop]})`})
                  const setNewRule = postcss.rule({selector: `.${nd.prop}\\.${node.selector.replace('.', '')}`})
                  const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s/).filter(i => i !== ''))) : []
                  for(let ref of refs) {
                    setNewRule.append(...declaration(ref, opts))
                  }
                  setAtRule.append(setNewRule)
                  mediaDecl.push(setAtRule)
                } else {
                  setRule.append(nd)
                }
              }
            }
            selectNodes.push(setRule, ...mediaDecl)
          } else {
            selectNodes.push(node)
          }
        }
        define[param] = selectNodes
      }
    }
    //rnode.remove()
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
