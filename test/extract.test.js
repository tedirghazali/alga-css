const postcss = require('postcss')
const algacss = require('../js/')
const execute = require('./execute.js')

test('Extract classes from files', async () => {
  let result = await postcss([
    algacss({
      extract: ['./test/extract/*.html', './test/extract/*.vue', './test/extract/*.svelte', './test/extract/*.astro']
    })
  ]).process('', { from: undefined })
  console.log(result.css)
})
