module.exports = (screen) => {
  const newScreenObj = {}
  for(let [key, val] of Object.entries(screen)) {
    newScreenObj[key] = {
      size: val.size,
      minmax: val.minmax,
      value: {},
      status: false,
      source: undefined
    }
    if(Array.isArray(val.alias) && val.alias.length >= 1) {
      for(let alias of val.alias) {
        newScreenObj[alias] = {
          size: val.size,
          minmax: val.minmax,
          value: {},
          status: false,
          source: undefined
        }
      }
    }
  }
  return newScreenObj
}
