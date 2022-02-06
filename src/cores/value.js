const camelDash = require('../helpers/camelDash.js')

module.exports = (value) => {
  let newValue = value.replaceAll('_', ' ')
  newValue = camelDash(newValue)
  return newValue
}
