const camelDash = require('../helpers/camelDash.js')
const lightenDarkenColor = require('../helpers/lightenDarkenColor.js')
const values = require('../configs/values.js')
const units = require('../configs/units.js')
const color = require('../configs/color.js')
const specialValues = ['currentColor']

module.exports = (value, opt = {}) => {
  let newValue = value.replaceAll('_', ' ')
  const newUnits = [...units.length, ...units.angle, ...units.time, ...units.resolution]
  const newColor = opt?.color || color
  
  if(Object.keys(values).includes(newValue.trim())) {
    newValue = values[newValue.trim()]
  }
  if(Object.keys(newColor).includes(newValue)) {
    newValue = newColor[newValue]
  }
  if(newValue.startsWith('lighten(') || newValue.startsWith('darken(')) {
    const splitValues = newValue.split(/\(|\)|\,/g)
    let colorValue = splitValues[1]
    let amtValue = splitValues[2]
    if(colorValue.includes('hex')) {
      colorValue = colorValue.replaceAll('hex', '')
    }
    if(Object.keys(newColor).includes(colorValue)) {
      colorValue = newColor[colorValue]
    }
    if(splitValues[0] === 'darken') {
      amtValue = '-' + amtValue
    }
    newValue = '#'+ lightenDarkenColor(colorValue.replaceAll('#', ''), Number(amtValue))
  }
  if(newValue.startsWith('calc(')) {
    newValue = newValue.split('_').map(item => {
      if(item.startsWith('refs(') || item.startsWith('props(')) {
        const splitValues = item.split(/\(|\)/g)
        item = opt[splitValues[0]][camelDash(splitValues[1])] || item
      }
      return item
    }).join('')
  }
  if(newValue.startsWith('refs(') || newValue.startsWith('props(')) {
    const splitValues = newValue.split(/\(|\)/g)
    newValue = opt[splitValues[0]][splitValues[1]] || newValue
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
