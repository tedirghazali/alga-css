const postcss = require('postcss')
const algacss = require('../src/')

async function execute(arg = { input: 'a {}', output: 'a {}', options: {} }) {
  let result = await postcss([
    algacss(arg.options)
  ]).process(arg.input, { from: undefined })
  expect(result.css).toEqual(arg.output)
  expect(result.warnings()).toHaveLength(0)
}

/*test('Reading component atRule', async () => {
  //await execute()
  let result = await postcss([
    algacss()
  ]).process(`
@use navBar;
  `, { from: undefined })
  console.log(result.css)
})*/

test('Reading component files', async () => {
  //await execute()
  let result = await postcss([
    algacss({
      extract: './**/*.vue'
    })
  ]).process(`
@use navBar;
  `, { from: undefined })
  console.log(result.css)
})
