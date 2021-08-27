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

test('Area at-rule test', async () => {
  await execute({
    input: `
@area dataTest {
  areas: "a b c" "a b c" "a b c";
  x: auto 1fr auto;
  y: auto 1fr auto;
}`,
    output: `.dataTest {
    display: grid;
    grid-template-areas: "a b c" "a b c" "a b c";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto
}`,
    options: {}
  })
})

test('Section of area test', async () => {
  await execute({
    input: `
@area invoiceTest {
  areas: "a b c" "a b c" "a b c";
  x: auto 1fr auto;
  y: auto 1fr auto;
  invoiceA: areaA;
  invoiceB: areaB;
  invoiceC: areaC;
}`,
    output: `.invoiceTest {
    display: grid;
    grid-template-areas: "a b c" "a b c" "a b c";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto
}
.invoiceA {
    grid-area: a
}
.invoiceB {
    grid-area: b
}
.invoiceC {
    grid-area: c
}`,
    options: {}
  })
})

/*test('at-rule example', async () => {
  let result = await postcss([
    algacss({})
  ]).process(`
@area invoiceTest {
  areas: "a b c" "a b c" "a b c";
  x: auto 1fr auto;
  y: auto 1fr auto;
  invoiceA: areaA;
  invoiceB: areaB;
  invoiceC: areaC;
}
  `, { from: undefined })
  console.log(result.css)
})*/
