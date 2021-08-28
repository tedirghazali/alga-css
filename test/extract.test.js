const postcss = require('postcss')
const algacss = require('../js/')
const execute = require('./execute.js')

test('Dropzone component style', async () => {
  let result = await postcss([
    algacss({
      extract: ['./test/extract/*.html', './test/extract/*.vue']
    })
  ]).process('', { from: undefined })
  console.log(result.css)
})
