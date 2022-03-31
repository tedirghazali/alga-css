const camelDash = require('../helpers/camelDash.js')
const values = require('../configs/values.js')

module.exports = (value) => {
  let newValue = value.replaceAll('_', ' ')
  if(Object.keys(values).includes(newValue.trim())) {
    newValue = values[newValue.trim()]
  }
  newValue = camelDash(newValue)
  if(newValue.includes('pct')) {
    newValue = newValue.replaceAll('pct', '%')
  }
  if(newValue.includes('hex')) {
    newValue = newValue.replaceAll('hex', '#')
  }
  return newValue
}
