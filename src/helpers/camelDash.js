module.exports = (camelCase) => {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z])/g, '$1-$2').toLowerCase().trim()
}
