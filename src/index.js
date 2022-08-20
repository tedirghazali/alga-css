const chokidar = require('chokidar')
const { readFile, writeFile } = require('fs')
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

// Helpers
const randomChar = require('./helpers/randomChar.js')

function algacss(options) {
  const config = {
    inits: [],
    preset: Object.assign({}, preset, options?.preset),
    screen: Object.assign({}, screen, options?.screen),
    state: Object.assign({}, state, options?.state),
    prefers: Object.assign({}, prefers, options?.prefers),
    /*color: Object.assign({}, color, options.color),*/
    components: {},
    extract: {raws: [], rules: []},
    helpers: []
  }
  
  const opts = {preset: config.preset, screen: config.screen, state: config.state, prefers: config.prefers}
  config.components = component(options?.src, opts)
  
  const watcher = chokidar.watch(options?.extract, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })
  
  watcher.on('change', path => {
    for(let helperFile of config.helpers) {
      readFile(helperFile, (err, data) => {
        if (err) throw err;
        let newData = data.toString()
        if(newData.includes('@use helpers { uniqid: ')) {
          newData = newData.replace(/\@use helpers \{ uniqid: .*\; \}/, '@use helpers { uniqid: '+ randomChar() +'; }')
        } else {
          newData = newData.replace('@use helpers;', '@use helpers { uniqid: '+ randomChar() +'; }')
        }
        writeFile(helperFile, newData, (err) => {
          if (err) throw err;
        })
      })
    }
  })
  
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
      root.walkAtRules('use', rule => {
        let param = rule.params.trim()
        let name = param
        if(param.includes('.')) {
          const prms = param.split('.')
          param = prms[0].trim()
          name = prms[1].trim()
        }
        if(name === 'helpers' || param === 'helpers') {
          if(root.source?.input?.from) {
            config.helpers.push(root.source.input.from)
          }
          config.extract = extraction(options?.extract, rule.source, {...opts, extract: config.extract})
          
          if(config.extract.rules.length >= 1) {
            root.append(...config.extract.rules)
          }
          rule.remove()
        } else if(config.components[name]) {
          let newNodes = []
          if(rule?.nodes) {
            for(let node of rule.nodes) {
              config.components[param]['props'][node.prop].value = node.value
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
          const newRoot = config.components[param]['root']
          newRoot.removeAll()
          newRoot.append(...newNodes)
          rule.replaceWith(newRoot)
        } else {
          rule.remove()
        }
      })
      
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
          /*newPackNodes.push([
            ...newNodes, 
            ...declaration(config.components[param][name]['body'],
            {
              source: config.components[param][name]['sourceBody'],
              refs: config.components[param]['refs'],
              props: config.components[param]['props'], 
              provide: config.components[param]['provide']
            },
            {
              screen: config.screen,
              state: config.state, 
              prefers: config.prefers
            })
          ])*/
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
          const newRoot = config.components[param]['root']
          newRoot.removeAll()
          newRoot.append(...newNodes)
          newPackNodes.push(newRoot)
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
