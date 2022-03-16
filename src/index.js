// Configs
const preset = require('./configs/preset.js')
const screen = require('./configs/screen.js')
const state = require('./configs/state.js')
const prefers = require('./configs/prefers.js')

// Cores
const component = require('./cores/component.js')
const declaration = require('./cores/declaration.js')
const extraction = require('./cores/extraction.js')

function algacss(options) {
  const config = {
    preset: Object.assign({}, preset, options?.preset),
    screen: Object.assign({}, screen, options?.screen),
    state: Object.assign({}, state, options?.state),
    prefers: Object.assign({}, prefers, options?.prefers),
    /*color: Object.assign({}, color, options.color),*/
    components: {},
    extract: []
  }
  
  const opts = {preset: config.preset, screen: config.screen, state: config.state, prefers: config.prefers}
  config.components = component(options?.src, opts)
  config.extract = extraction(options?.extract, opts)
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkAtRules('use', rule => {
        let param = rule.params.trim()
        let name = param
        if(param.includes('.')) {
          const prms = param.split('.')
          param = prms[0].trim()
          name = prms[1].trim()
        }
        if(config.components[param]) {
          let newNodes = []
          if(rule?.nodes) {
            for(let node of rule.nodes) {
              config.components[param]['props'][node.prop] = node.value
            }
          }
          newNodes = [
            ...newNodes, 
            ...declaration(config.components[param][name]['body'], config.components[param]['props'], config.components[param]['provide'], {
              screen: config.screen,
              state: config.state, 
              prefers: config.prefers
            })
          ]
          rule.replaceWith(newNodes)
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
