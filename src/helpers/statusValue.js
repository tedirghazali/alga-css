module.exports = (objectArg) => {
  const newObj = {}
  for(let [key, val] of Object.entries(objectArg)) {
    newObj[key] = val
    newObj[key]['value'] = {}
    newObj[key]['status'] = false
  }
  return newObj
}
