const provide = require('./provide.js')
const extract = require('./extract.js')
const screen = require('./screen.js')
const prefers = require('./prefers.js')

// caranya bukan parse tapi menggunakan regexp
function algacss(options, result) {
  const config = {
    provide: {},
    screen: Object.assign({}, screen, options.screen),
    prefers: Object.assign({}, prefers),
    extract: {}
  }
  
  config.provide = provide(options.provide)
  config.extract = extract(options.extract)
  
  return {
    Once (root, {Rule, Declaration, AtRule}) {
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
            } else {
              selectNodes.push(node)
            }
          }
          config.provide[param] = selectNodes
        }
        rule.remove()
      })
      
      root.walkAtRules(/^inject/i, rule => {
        const param = rule.params.trim() //? rule.params.trim().split(/\s|\,/).filter(i => i !== '') : []
        
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
