// Configs
const preset = require('./configs/preset.js')
const screen = require('./configs/screen.js')

// Cores
const component = require('./cores/component.js')

function algacss(options) {
  const config = {
    preset: Object.assign({}, preset, options?.preset),
    screen: Object.assign({}, screen, options?.screen),
    /*prefers: Object.assign({}, prefers),
    color: Object.assign({}, color, options.color),*/
    components: {},
    props: {},
    extract: []
  }
  
  config.components = component(options.src, {preset: config.preset, screen: config.screen})
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkAtRules('define', rule => {
        const param = rule.params.trim()
        const defineObj = {}
        for(let dnode of rule.nodes) {
          defineObj[dnode.prop] = dnode.value
        }
        config.components[param] = Object.assign({}, config.components[param], defineObj)
        rule.remove()
      })
      
      /*root.walkDecls('ref', decl => {
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
      })*/
    
      root.walkAtRules('alga', rule => {
        const param = rule.params.trim()
        config.components[param] = rule.nodes
        rule.remove()
      })
      
      root.walkAtRules('use', rule => {
        const param = rule.params.trim()
        config.props[param] = []
        if(rule.nodes) {
          config.props[param] = rule.nodes
        }
        
        if(config.components[param]) {
          rule.replaceWith(config.components[param])
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
    prepare() {
      return algacss(opts)
    }
  }
}

module.exports.postcss = true
