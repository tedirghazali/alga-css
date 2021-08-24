//const postcss = require('postcss')
//const algacss = require('../js/')
const execute = require('./execute.js')

/*async function execute(arg = { input: 'a {}', output: 'a {}', options: {} }) {
  let result = await postcss([
    algacss(arg.options)
  ]).process(arg.input, { from: undefined })
  expect(result.css).toEqual(arg.output)
  expect(result.warnings()).toHaveLength(0)
}*/

test('Template at-rule test', async () => {
  await execute({
    input: `
@template dataTable {
  areas: "a b c" "a b c" "a b c";
  x: auto 1fr auto;
  y: auto 1fr auto;
}`,
    output: `.dataTable {
    display: grid;
    grid-template-areas: "a b c" "a b c" "a b c";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto
}`,
    options: {}
  })
})
