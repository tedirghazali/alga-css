const postcss = require('postcss')
const algacss = require('../src/')

test('Reading css classes from file', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      extract: './**/*.vue'
    })
  ]).process(``, { from: undefined })
  console.log(result.css)
})
