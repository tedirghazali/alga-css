const postcss = require('postcss')
const algacss = require('../js/')
const execute = require('./execute.js')

test('Dropzone component style', async () => {
  let result = await postcss([
    algacss({})
  ]).process(`
@inject dropzone;
  `, { from: undefined })
  console.log(result.css)
})
