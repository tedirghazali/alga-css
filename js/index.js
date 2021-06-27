//const postcss = require('postcss')

// caranya bukan parse tapi menggunakan regexp
function algaCSS(options, result) {
  
  const variables = {}
  return {
    Declaration (node) {
      if (node.variable) {
        variables[node.prop] = node.value
      }
    },
    OnceExit () {
      console.log(variables)
    }
  }
      
}

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'algacss',
    prepare (res) {
      return algaCSS(opts, res)
    }
  }
}

module.exports.postcss = true
