const camelDash = require('../helpers/camelDash.js')

module.exports = (value) => {
  let newValue = value.replaceAll('_', ' ')
  newValue = camelDash(newValue)
  if(newValue.includes('pct')) {
    newValue = newValue.replaceAll('pct', '%')
  }
  if(newValue.includes('hex')) {
    newValue = newValue.replaceAll('hex', '#')
  }
  return newValue
}
