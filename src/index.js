// Configs
const preset = require('./configs/preset.js')
const screen = require('./configs/screen.js')
const state = require('./configs/state.js')
const prefers = require('./configs/prefers.js')

// Cores
const component = require('./cores/component.js')
const declaration = require('./cores/declaration.js')
const extraction = require('./cores/extraction.js')
const packages = require('./cores/package.js')

function algacss(options) {
  const config = {
    inits: [],
    preset: Object.assign({}, preset, options?.preset),
    screen: Object.assign({}, screen, options?.screen),
    state: Object.assign({}, state, options?.state),
    prefers: Object.assign({}, prefers, options?.prefers),
    /*color: Object.assign({}, color, options.color),*/
    components: {},
    extract: {raws: [], rules: []}
  }
  
  const opts = {preset: config.preset, screen: config.screen, state: config.state, prefers: config.prefers}
  config.components = component(options?.src, opts)
  config.extract = extraction(options?.extract, {...opts, extract: config.extract})
  
  if(options?.plugins && Number(options?.plugins.length) >= 1) {
    const newPlugins = options?.plugins.map(item => {
      return './node_modules/'+item+'/*.alga'
    })
    const newComponent = packages(newPlugins, opts)
    config.components = Object.assign({}, config.components, newComponent)
    for(let keyComponent of Object.keys(newComponent)) {
      if(newComponent[keyComponent]['inits']) {
        for(let init of newComponent[keyComponent]['inits']) {
          if(!config.inits.map(i => i.params).includes(init.params)) {
            config.inits.push(init)
          }
        }
      }
    }
  }
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
      root.walkAtRules('extract', rule => {
        let param = rule.params.trim()
        if(param === 'refresh') {
          config.extract = extraction(options?.extract, {...opts, extract: config.extract})
        }
        else if(param === 'force') {
          config.extract = extraction(options?.extract, {...opts, extract: config.extract})
          
          if(config.extract.rules.length >= 1) {
            root.append(...config.extract.rules)
          }
        }
      })
    
      root.walkAtRules('use', rule => {
        let param = rule.params.trim()
        let name = param
        if(name === 'base') {
          config.extract = extraction(options?.extract, {...opts, extract: config.extract})
        }
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
            ...declaration(config.components[param][name]['body'],
            {
              refs: config.components[param]['refs'],
              props: config.components[param]['props'], 
              provide: config.components[param]['provide']
            },
            {
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
      
      if(config.extract.rules.length >= 1) {
        root.append(...config.extract.rules)
      }
      
      let newPackNodes = []
      const filterPackNodes = []
      for(let rule of config.inits) {
        let param = rule.params.trim()
        let name = param
        if(param.includes('.')) {
          const prms = param.split('.')
          param = prms[0].trim()
          name = prms[1].trim()
        }
        if(!filterPackNodes.includes(param) && config.components[param]) {
          filterPackNodes.push(param)
          let newNodes = []
          if(rule?.nodes) {
            for(let node of rule.nodes) {
              config.components[param]['props'][node.prop] = node.value
            }
          }
          newPackNodes.push([
            ...newNodes, 
            ...declaration(config.components[param][name]['body'],
            {
              refs: config.components[param]['refs'],
              props: config.components[param]['props'], 
              provide: config.components[param]['provide']
            },
            {
              screen: config.screen,
              state: config.state, 
              prefers: config.prefers
            })
          ])
        }
      }
      root.append(...newPackNodes.flat())
      
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
