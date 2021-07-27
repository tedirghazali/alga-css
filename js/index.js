const define = require('./define.js')
const provide = require('./provide.js')
const extract = require('./extract.js')
const screen = require('./screen.js')
const prefers = require('./prefers.js')
const color = require('./color.js')
const reference = require('./reference.js')
const select = require('./select.js')

// caranya bukan parse tapi menggunakan regexp
function algacss(options, result) {
  const config = {
    select: Object.assign({}, select, options.select),
    screen: Object.assign({}, screen, options.screen),
    prefers: Object.assign({}, prefers),
    color: Object.assign({}, color, options.color),
    define: {},
    provide: {},
    extract: {}
  }
  
  config.define = define(options.define, {screen: config.screen, prefers: config.prefers, color: config.color, select: config.select})
  config.provide = provide(options.provide)
  config.extract = extract(options.extract)
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkAtRules(/^set/i, rule => {
        const param = rule.params.trim()
        
        if(config.define[param] === undefined) {
          const selectNodes = []
          for(let node of rule.nodes) {
            if(node.type === 'atrule' && node.name === 'props') {
              if(config.define[node.params.trim()]) {
                selectNodes.push(...config.define[node.params.trim()])
              }
            } else if(node.type === 'atrule' && node.name === 'ref') {
              const refs = node.params.trim() ? Array.from(new Set(node.params.trim().split(/\s|\|/).filter(i => i !== ''))) : []
              for(let ref of refs) {
                selectNodes.push(...reference(ref, {screen: config.screen, prefers: config.prefers, color: config.color, select: config.select}))
              }
            } else {
              selectNodes.push(node)
            }
          }
          config.define[param] = selectNodes
        }
        rule.remove()
      })
      
      root.walkAtRules(/^get/i, rule => {
        const param = rule.params.trim()
        
        if(config.define[param]) {
          const setRule = new Rule({selector: param})
          setRule.append(...config.define[param])
          rule.replaceWith(setRule)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules(/^prefers/i, rule => {
        const param = rule.params.trim()
        
        if(config.prefers[prefersParam]) {
          const media = new AtRule({name: 'media', params: config.prefers[prefersParam]})
          media.append(node.nodes)
          rule.replaceWith(media)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules(/^screen/i, rule => {
        const param = rule.params.trim()
        
        if(config.screen[screenParam]) {
          const media = new AtRule({name: 'media', params: `(min-width: ${config.screen[screenParam]})`})
          media.append(node.nodes)
          rule.replaceWith(media)
        } else {
          rule.remove()
        }
      })
      
      root.walkAtRules(/^provide/i, rule => {
        const param = rule.params.trim()
        
        if(config.provide[param] === undefined) {
          const selectNodes = []
          for(let node of rule.nodes) {
            if(node.name === 'prefers') {
              const prefersParam = node.params.trim()
              if(config.prefers[prefersParam]) {
                const media = new AtRule({name: 'media', params: config.prefers[prefersParam]})
                media.append(node.nodes)
                selectNodes.push(media)
              } else {
                node.remove()
              }
            } else if(node.name === 'screen') {
              const screenParam = node.params.trim()
              if(config.screen[screenParam]) {
                const media = new AtRule({name: 'media', params: `(min-width: ${config.screen[screenParam]})`})
                media.append(node.nodes)
                selectNodes.push(media)
              } else {
                node.remove()
              }
            } else if(node.name === 'get') {
              const getParam = node.params.trim()
              if(config.define[getParam]) {
                const setRule = new Rule({selector: getParam})
                setRule.append(...config.define[getParam])
                selectNodes.push(setRule)
              } else {
                node.remove()
              }
            } else {
              selectNodes.push(node)
            }
          }
          config.provide[param] = selectNodes
        }
        rule.remove()
      })
      
      root.walkAtRules(/^inject/i, rule => {
        const param = rule.params.trim()
        
        if(config.provide[param]) {
          rule.replaceWith(config.provide[param])
        } else {
          rule.remove()
        }
        
      })
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
