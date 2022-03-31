const define = require('./define.js')
const provide = require('./provide.js')
const component = require('./component.js')
const extract = require('./extract.js')
const screen = require('./screen.js')
const prefers = require('./prefers.js')
const color = require('./color.js')
const declaration = require('./declaration.js')
const preset = require('./preset.js')

// caranya bukan parse tapi menggunakan regexp
function algacss(options) {
  const config = {
    preset: Object.assign({}, preset, options.preset),
    screen: Object.assign({}, screen, options.screen),
    prefers: Object.assign({}, prefers),
    color: Object.assign({}, color, options.color),
    define: {},
    provide: {},
    component: {},
    extract: []
  }
  
  const opts1 = {screen: config.screen, prefers: config.prefers, color: config.color, preset: config.preset}
  config.define = define(options.define, opts1)
  
  const opts2 = {define: config.define, ...opts1}
  config.provide = provide(options.define, opts2)
  config.component = component(options.define, {define: config.define, provide: config.provide})
  config.extract = extract(options.extract, opts2)
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkDecls('ref', decl => {
        const refs = decl.value.trim() ? Array.from(new Set(decl.value.trim().split(/\s/).filter(i => i !== ''))) : []
        if(refs.length > 0) {
          const selectNodes = []
          for(let ref of refs) {
            selectNodes.push(...declaration(ref, opts1))
          }
          decl.replaceWith(...selectNodes)
        } else {
          decl.remove()
        }
      })
      
      root.walkAtRules('area', rule => { ///^area/i
        const areaArray = []
        const name = new Rule({ selector: '.'+rule.params.replace('.', '').trim() })
        name.append(new Declaration({ prop: 'display', value: 'grid'}))
        if(rule.nodes) {
          for(let node of rule.nodes) {
            if(node.type === 'decl' && node.prop === 'areas') {
              name.append(new Declaration({ prop: 'grid-template-areas', value: node.value}))
            } else if(node.type === 'decl' && node.prop === 'y') {
              name.append(new Declaration({ prop: 'grid-template-rows', value: node.value}))
            } else if(node.type === 'decl' && node.prop === 'x') {
              name.append(new Declaration({ prop: 'grid-template-columns', value: node.value}))
            } else if(node.type === 'decl' && node.prop === 'template') {
              name.append(new Declaration({ prop: 'grid-template', value: node.value}))
            } else {
              if(node.type === 'decl' && (node.prop !== undefined && node.prop !== null && node.prop !== '')) {
                const areaRule = new Rule({ selector: '.'+node.prop.trim() })
                const areaNodes = []
                const refs = node.value.trim() ? Array.from(new Set(node.value.trim().split(/\s/).filter(i => i !== ''))) : []
                for(let ref of refs) {
                  areaNodes.push(...declaration(ref, opts1))
                }
                areaRule.append(...areaNodes)
                areaArray.push(areaRule)
              }
            }
          }
          areaArray.unshift(name)
          rule.replaceWith(...areaArray)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules('set', rule => {
        const param = rule.params.trim()
        
        if(config.define[param] === undefined) {
          const selectNodes = []
          for(let node of rule.nodes) {
            if(node.type === 'decl' && node.prop === 'props') {
              if(config.define[node.value.trim()]) {
                selectNodes.push(config.define[node.value.trim()].join(';'))
              }
            } else if(node.type === 'decl' && node.prop === 'ref') {
              const refs = node.value.trim() ? Array.from(new Set(node.value.trim().split(/\s/).filter(i => i !== ''))) : []
              for(let ref of refs) {
                selectNodes.push(...declaration(ref, opts1))
              }
            } else {
              selectNodes.push(node)
            }
          }
          config.define[param] = selectNodes
        }
        rule.remove()
      })
      
      root.walkAtRules('get', rule => {
        const param = rule.params.trim()
        
        if(config.define[param]) {
          const setRule = new Rule({selector: '.'+param})
          setRule.append(...config.define[param])
          if(rule.nodes) {
            for(let node of rule.nodes) {
              if(node.type === 'decl' && node.prop === 'emit') {
                const refs = node.value.trim() ? Array.from(new Set(node.value.trim().split(/\s/).filter(i => i !== ''))) : []
                for(let ref of refs) {
                  setRule.append(...declaration(ref, opts1))
                }
              }
            }
          }
          rule.replaceWith(setRule)
        } else {
          rule.remove()
        }
      })
      
      root.walkDecls('props', decl => {
        const props = decl.value.trim()
        if(props) {
          const selectNodes = []
          if(Array.isArray(config.define[props])) {
            Array.from(config.define[props]).forEach((item) => {
            selectNodes.push(item)
            })
          }
          decl.replaceWith(selectNodes.join(';'))
        } else {
          decl.remove()
        }
      })
      
      root.walkAtRules('prefers', rule => {
        const prefersParam = rule.params.trim()
        
        if(config.prefers[prefersParam]) {
          const media = new AtRule({name: 'media', params: config.prefers[prefersParam]})
          media.append(rule.nodes)
          rule.replaceWith(media)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules('screen', rule => {
        const screenParam = rule.params.trim()
        
        if(config.screen[screenParam]) {
          const media = new AtRule({name: 'media', params: `(min-width: ${config.screen[screenParam]})`})
          media.append(rule.nodes)
          rule.replaceWith(media)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules('provide', rule => {
        const param = rule.params.trim()
        
        if(config.provide[param] === undefined) {
          const selectNodes = []
          for(let node of rule.nodes) {
            if(node.type === 'atrule' && node.name === 'prefers') {
              const prefersParam = node.params.trim()
              if(config.prefers[prefersParam]) {
                const media = new AtRule({name: 'media', params: config.prefers[prefersParam]})
                media.append(node.nodes)
                selectNodes.push(media)
              } else {
                node.remove()
              }
            } else if(node.type === 'atrule' && node.name === 'screen') {
              const screenParam = node.params.trim()
              if(config.screen[screenParam]) {
                const media = new AtRule({name: 'media', params: `(min-width: ${config.screen[screenParam]})`})
                media.append(node.nodes)
                selectNodes.push(media)
              } else {
                node.remove()
              }
            } else if(node.type === 'atrule' && node.name === 'get') {
              const getParam = node.params.trim()
              if(config.define[getParam]) {
                const setRule = new Rule({selector: '.'+getParam})
                setRule.append(...config.define[getParam])
                if(node.nodes) {
                  for(let getNode of node.nodes) {
                    if(getNode.type === 'decl' && getNode.prop === 'emit') {
                      const refs = getNode.value.trim() ? Array.from(new Set(getNode.value.trim().split(/\s/).filter(i => i !== ''))) : []
                      for(let ref of refs) {
                        setRule.append(...declaration(ref, opts1))
                      }
                    }
                  }
                }
                selectNodes.push(setRule)
              } else {
                node.remove()
              }
            } if(node.type === 'rule') {
              const setRule = new Rule({selector: node.selector})
              if(node.nodes) {
                for(let nd of node.nodes) {
                  if(nd.type === 'decl' && nd.prop === 'props') {
                    if(config.define[nd.value.trim()] !== undefined) {
                      setRule.append(config.define[nd.value.trim()].join(';'))
                    }
                  } else if(nd.type === 'decl' && nd.prop === 'ref') {
                    const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s/).filter(i => i !== ''))) : []
                    for(let ref of refs) {
                      setRule.append(...declaration(ref, opts1))
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
          config.provide[param] = selectNodes
        }
        rule.remove()
      })
      
      root.walkAtRules('inject', rule => {
        const param = rule.params.trim()
        
        if(config.provide[param]) {
          rule.replaceWith(...config.provide[param])
        } else {
          rule.remove()
        }
        
      })
      
      root.walkAtRules('component', rule => {
        const param = rule.params.trim()
        
        if(config.component[param] === undefined) {
          config.component[param] = rule
        }
        rule.remove()
      })
      
      root.walkAtRules('use', rule => {
        const param = rule.params.trim()
        
        if(config.component[param]) {
          const selectNodes = []
          for(let use of Object.values(config.component[param])) {
            for(let node of use.nodes)
              if(use.type === 'atrule' && use.prop === 'set') {
                if(config.define[node.params.trim()] === undefined) {
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
                  config.define[node.value.trim()] = selectNodes
                }
              } else if(use.type === 'atrule' && use.prop === 'component') {
                if(node.type === 'rule') {
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
                }
              }
            }
          }
          rule.replaceWith(...selectNodes)
        } else {
          rule.remove()
        }
        
      })
      
      root.walkAtRules('render', rule => {
        const param = rule.params.trim()
        
        if(config.component[param]) {
          const selectNodes = []
          for(let node of config.component[param].nodes) {
            if(node.type === 'decl' && node.prop === 'get') {
              if(config.define[node.value.trim()]) {
                const setRule = new Rule({selector: '.'+node.value.trim()})
                setRule.append(...config.define[node.value.trim()])
                selectNodes.push(setRule)
              }
            } else if(node.type === 'decl' && node.prop === 'inject') {
              if(config.provide[node.value.trim()]) {
                selectNodes.push(config.provide[node.value.trim()])
              }
            }
          }
          rule.replaceWith(...selectNodes)
        } else {
          rule.remove()
        }
        
      })
      
      if(config.extract.length >= 1) {
        root.append(...config.extract)
      }
    }
  }
      
}

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'algacss',
    prepare() {
      return algacss(opts)
    }
  }
}

module.exports.postcss = true
