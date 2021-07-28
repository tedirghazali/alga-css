module.exports = (val, unit, defUnit, defSize) => {
  let valRes = '0px'
  const valArr = val.split(/(\d+)(\w+)/).filter(i => i !== '')
  if(unit.includes(valArr[valArr.length - 1])) {
    if(valArr[0] === 'n') {
      if(valArr.length === 3) {
        valRes = `-${valArr[0]}${valArr[1]}`
      }
    } else {
      if(valArr.length === 2) {
        valRes = `${valArr[0]}${valArr[1]}`
      }
    }
  } else {
    const valNum = val.replace('n', '-')
    if(isNaN(valNum) === false && Number(valNum) !== 0) {
      valRes = `${(Number(defSize) * valNum)}${defUnit}`
    }
  }
  return valRes
}
