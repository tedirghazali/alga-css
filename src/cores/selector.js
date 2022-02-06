module.exports = (root, param) => {
  newSelectors = []
  for(let selector of root.selectors) {
    let newSelector = selector.trim()
    if(newSelector.includes('&')) {
      newSelector.replaceAll('&', param.trim())
    } else {
      newSelector = param.trim() +' '+ newSelector
    }
    newSelectors.push(newSelector.trim())
  }
  return newSelectors.join(', ')
}
