const define = require('./define.js')
const provide = require('./provide.js')
const extract = require('./extract.js')
const screen = require('./screen.js')
const prefers = require('./prefers.js')
const color = require('./color.js')
const declaration = require('./declaration.js')
const preset = require('./preset.js')

// caranya bukan parse tapi menggunakan regexp
function algacss(options, result) {
  const config = {
    preset: Object.assign({}, preset, options.preset),
    screen: Object.assign({}, screen, options.screen),
    prefers: Object.assign({}, prefers),
    color: Object.assign({}, color, options.color),
    define: {},
    provide: {},
    extract: []
  }
  
  const opts1 = {screen: config.screen, prefers: config.prefers, color: config.color, preset: config.preset}
  config.define = define(options.define, opts1)
  
  const opts2 = {define: config.define, ...opts1}
  config.provide = provide(options.provide, opts2)
  config.extract = extract(options.extract, opts2)
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkDecls('ref', decl => {
        const refs = decl.value.trim() ? Array.from(new Set(decl.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
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
                const refs = node.value.trim() ? Array.from(new Set(node.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
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
              const refs = node.value.trim() ? Array.from(new Set(node.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
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
                const refs = node.value.trim() ? Array.from(new Set(node.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
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
        const param = rule.params.trim()
        
        if(config.prefers[prefersParam]) {
          const media = new AtRule({name: 'media', params: config.prefers[prefersParam]})
          media.append(node.nodes)
          rule.replaceWith(media)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules('screen', rule => {
        const param = rule.params.trim()
        
        if(config.screen[screenParam]) {
          const media = new AtRule({name: 'media', params: `(min-width: ${config.screen[screenParam]})`})
          media.append(node.nodes)
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
                      const refs = getNode.value.trim() ? Array.from(new Set(getNode.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
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
                    const refs = nd.value.trim() ? Array.from(new Set(nd.value.trim().split(/\s|\|/).filter(i => i !== ''))) : []
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
      
      if(config.extract.length >= 1) {
        root.append(...config.extract)
      }
    }
  }
      
}

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'algacss',
    prepare (res) {
      return algacss(opts, res)
    }
  }
}

module.exports.postcss = true
