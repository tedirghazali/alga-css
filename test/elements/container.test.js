const postcss = require('postcss')
const algacss = require('../../js/')
const execute = require('../execute.js')

/*test('Container style testing', async () => {
  execute({
    input: `@inject component;`,
    output: ``,
    options: {}
  })
})*/


test('Container style testing', async () => {
  let result = await postcss([
    algacss({})
  ]).process(`
@inject container;
  `, { from: undefined })
  console.log(result.css)
})

