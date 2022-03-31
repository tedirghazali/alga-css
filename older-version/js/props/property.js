const bd = require('./bd-prop.js')
const outline = require('./outline-prop.js')
const bg = require('./bg-prop.js')
const txt = require('./txt-prop.js')

module.exports = {
  ...bd.property,
  ...outline.property,
  ...bg.property,
  ...txt.property,
  sd: 'shadow'
}
