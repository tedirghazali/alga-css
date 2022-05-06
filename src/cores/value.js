const camelDash = require('../helpers/camelDash.js')
const values = require('../configs/values.js')
const units = require('../configs/units.js')
const specialValues = ['currentColor']

module.exports = (value) => {
  let newValue = value.replaceAll('_', ' ')
  const newUnits = [...units.length, ...units.angle, ...units.time, ...units.resolution]
  if(Object.keys(values).includes(newValue.trim())) {
    newValue = values[newValue.trim()]
  }
  if(!specialValues.includes(newValue)) {
    newValue = camelDash(newValue)
  }
  if(/\d+/g.test(newValue)) {
    const unitVals = []
    for(let newVal of newValue.split(' ')) {
      const splitValByNum = newVal.split(/\d+/g)
      if(newVal.startsWith('n') && newUnits.includes(splitValByNum[Number(splitValByNum.length) - 1])) {
        unitVals.push(newVal.replace('n', '-'))
      } else if(newVal.includes('/')) {
        const splitValue = newVal.split('/')
        if(isNaN(splitValue[0]) === false && isNaN(splitValue[1]) === false) {
          unitVals.push(Number(((Number(splitValue[0]) / Number(splitValue[1])) * 100).toFixed(6)) + '%')
        } else {
          unitVals.push(newVal)
        }
      } else {
        unitVals.push(newVal)
      }
    }
    newValue = unitVals.join(' ')
  }
  if(newValue.includes('pct')) {
    newValue = newValue.replaceAll('pct', '%')
  }
  if(newValue.includes('hex')) {
    newValue = newValue.replaceAll('hex', '#')
  }
  return newValue
}
