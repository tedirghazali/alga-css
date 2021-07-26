const postcss = require('postcss')
const properties = require('./properties.js')

module.exports = (refs, opts) => {
  const setRefs = []
  
  for(let ref of refs) {
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
          const prm = param.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
          prm.forEach((pr, ind) => {
            if(ind === 0) {
              if(Object.keys(properties).includes(pr)) {
              
              }
            } else {
              if(Object.keys(opts.color).includes(pr)) {
              
              }
            }
          })
        }
      }
    })
  }
  
  return setRefs
}
