const postcss = require('postcss')
const algacss = require('../js/')

async function execute(arg = { input: 'a {}', output: 'a {}', options: {} }) {
  let result = await postcss([
    algacss(arg.options)
  ]).process(arg.input, { from: undefined })
  expect(result.css).toEqual(arg.output)
  expect(result.warnings()).toHaveLength(0)
}

/*test('First impression working with posecss', async () => {
  await execute()
})*/

test('Table element test', async () => {
  let result = await postcss([
    algacss({})
  ]).process(`
@inject table;
  `, { from: undefined })
  console.log(result.css)
})
