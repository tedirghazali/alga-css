const postcss = require('postcss')
const glob = require('glob')
const fs = require('fs')
const camelDash = require('../helpers/camelDash.js')
const reference = require('./reference.js')

function readPath(rp, opts) {
  const component = {}
  const data = fs.readFileSync(rp, 'utf8')
  
  const splitFilePath = rp.split('/')[Number(rp.split('/').length) - 1]
  const splitFileName = splitFilePath.split('.')[0]
  let componentName = splitFileName
  
  const root = postcss.parse(data)
  root.walkAtRules('alga', rule => {
    componentName = rule.params.trim()
  })
  component[componentName] = {}
  for(let rnode of root.nodes) {
    // Convert define into property
    if(rnode.type === 'atrule' && rnode.name === 'define') {
      const param = rnode.params.trim()
      const defineObj = {}
      for(let dnode of rnode.nodes) {
        defineObj[dnode.prop] = dnode.value
      }
      component[componentName][param] = Object.assign({}, component[componentName][param], defineObj)
    // Get all provide and set a new property under provide
    } else if(rnode.type === 'atrule' && rnode.name === 'provide') {
      const param = rnode.params.trim()
      const defineObj = {}
      defineObj[param] = {}
      for(let dnode of rnode.nodes) {
        // Extracting content of provide
        if(dnode.type === 'decl' && dnode.prop === 'ref') {
          defineObj[param] = Object.assign({}, defineObj[param], reference(dnode.value))
        } else if(dnode.type === 'decl' && dnode.prop.startsWith('props-')) {
          splitProps = dnode.prop.split('-')[1]
          splitPropsObj = {}
          splitPropsObj[camelDash(splitProps)] = '{'+dnode.value+'}'
          defineObj[param] = Object.assign({}, defineObj[param], splitPropsObj)
        }
      }
      console.log(defineObj[param])
      component[componentName]['provide'] = Object.assign({}, component[componentName]['provide'], defineObj)
    }
    
    // old code
    /*if(rnode.type === 'atrule' && rnode.name === 'component') {
      const param = rnode.params.trim()
      if(param) {
        const selectNodes = []
        for(let node of rnode.nodes) {
          if(node.type === 'atrule') {
            if(node.name === 'prefers') {
              const prefersParam = node.params.trim()
              if(opts.prefers[prefersParam] !== undefined) {
                const media = postcss.atRule({name: 'media', params: opts.prefers[prefersParam]})
                const mediaSels = []
                for(let nds of node.nodes) {
                  const setRule = postcss.rule({selector: nds.selector})
                  for(let nd of nds.nodes) {
                    if(nd.type === 'decl' && nd.prop === 'props') {
                      if(opts.define[nd.value.trim()] !== undefined) {
                        setRule.append(opts.define[nd.value.trim()].join(';'))
                      }
                    } else if(nd.type === 'decl' && nd.prop === 'ref') {
                      const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s/).filter(i => i !== ''))) : []
                      for(let ref of refs) {
                        setRule.append(...declaration(ref, opts))
                      }
                    } else {
                      setRule.append(nd)
                    }
                  }
                  mediaSels.push(setRule)
                }
                media.append(mediaSels)
                selectNodes.push(media)
              }
              node.remove()
            } else if(node.name === 'screen') {
              const screenParam = node.params.trim()
              if(Object.keys(opts.screen).includes(screenParam)) {
                const media = postcss.atRule({name: 'media', params: `(min-width: ${opts.screen[screenParam]})`})
                const mediaSels = []
                for(let nds of node.nodes) {
                  const setRule = postcss.rule({selector: nds.selector})
                  for(let nd of nds.nodes) {
                    if(nd.type === 'decl' && nd.prop === 'props') {
                      if(opts.define[nd.value.trim()] !== undefined) {
                        setRule.append(opts.define[nd.value.trim()].join(';'))
                      }
                    } else if(nd.type === 'decl' && nd.prop === 'ref') {
                      const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s/).filter(i => i !== ''))) : []
                      for(let ref of refs) {
                        setRule.append(...declaration(ref, opts))
                      }
                    } else {
                      setRule.append(nd)
                    }
                  }
                  mediaSels.push(setRule)
                }
                media.append(mediaSels)
                selectNodes.push(media)
              }
              node.remove()
            } else if(node.name === 'get') {
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
        component[param] = selectNodes
      }
    }*/
    //rnode.remove()
  }
  console.log(component)
  return component
}

module.exports = (paths, opts) => {
  let component = {}
  
  const coreFiles = fs.readdirSync(__dirname.toString().replace('src/cores', 'alga') + '/')
  if(coreFiles) {
    for(let file of coreFiles) {
      if(file.endsWith('alga.css') || file.endsWith('.alga')) {
        component = Object.assign({}, component, readPath(__dirname.toString().replace('src/cores', 'alga') + '/' + file, opts))
      }
    }
  }
  
  if(typeof paths === 'string') {
    const files = glob.sync(paths, {})
    for(let file of files) {
      if(file.endsWith('alga.css') || file.endsWith('.alga')) {
        component = Object.assign({}, component, readPath(file, opts))
      }
    }
  } else if(Array.isArray(paths)) {
    for(let p of Array.from(paths)) {
      if(typeof p === 'string') {
        const files = glob.sync(p, {})
        for(let file of files) {
          if(file.endsWith('alga.css') || file.endsWith('.alga')) {
            component = Object.assign({}, component, readPath(file, opts))
          }
        }
      }
    }
  }
  
  return component
}
