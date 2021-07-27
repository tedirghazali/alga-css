const postcss = require('postcss')
const properties = require('./properties.js')
const colorUtil = require('./utilities/color-utility.js')

module.exports = (ref, opts) => {
  const setRef = []
  let setAlpha = 1
  const objRule = {}
  const params = ref.trim().split(/\.|-|_|\:/) // split camelCase ref.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  
  params.forEach((param, index) => {
    if(index === 0) {
      if(Object.keys(opts.select).includes(param)) {
        param = opts.select[param]
      }
          
      if(Object.keys(opts.screen).includes(param)) {
        objRule['type'] = 'screen'
        objRule['rule'] = postcss.AtRule({ name: 'media', params: '(min-width: ${opts.screen[param]})' })
      } else if(param === 'dark' || param === 'light' || param === 'reduce') {
        objRule['type'] = 'prefers'
        objRule['rule'] = postcss.AtRule({ name: 'media', params: opts.prefers[param] })
      } else if(param === 'print' || param === 'screen') {
        objRule['type'] = 'print'
        objRule['rule'] = postcss.AtRule({ name: 'media', params: param })
      } else {
        objRule['type'] = 'main'
        objRule['color'] = ''
        objRule['fill'] = ''
        const prm = param.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().trim().split('-')
        prm.forEach((pr, ind) => {
          if(ind === 0) {
            if(Object.keys(opts.color).includes(pr)) {
              objRule['color'] = pr
              objRule['colors'] = {
                'color': (pr !== 'white' && pr !== 'yellow' && pr !== 'warning') ? '#fff' : '#333',
                'background-color': opts.color[pr],
                'border-color': opts.color[pr]
              }
            } else if(Object.keys(properties).includes(pr)) {
              objRule['rule'] = pr
            }
          } else if(ind === 1) {
            if(prm[0] === objRule['color'] && pr === 'outlined') {
              objRule['fill'] = pr
              objRule['colors'] = {
                'color': opts.color[objRule['color']],
                'background-color': 'transparent',
                'border-color': opts.color[objRule['color']]
              }
            }
          } else if(ind === 2) {
            
          }
        })
      }
    } else if(index === 1) {
      if(params[0].toLowerCase().startsWith(objRule['color'] + objRule['fill']) && isNaN(param) === false) {
        setAlpha = Number('0.'+param)
      }
    }
  })
  if(typeof objRule['colors'] === 'object' && objRule['colors'] !== null) {
    for(let [key, val] of Object.entries(objRule['colors'])) {
      setRef.push(postcss.decl({ prop: key, value: (typeof val !== 'string') ? colorUtil(val, setAlpha) : val }))
    }
  }
  
  return setRef
}
