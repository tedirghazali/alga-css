const postcss = require('postcss')
const algacss = require('../js/')

async function execute(arg = { input: 'a {}', output: 'a {}', options: {} }) {
  let result = await postcss([
    algacss(arg.options)
  ]).process(arg.input, { from: undefined })
  expect(result.css).toEqual(arg.output)
  expect(result.warnings()).toHaveLength(0)
}

test('Set and get atrule with basic declaration', async () => {
  await execute({
    input: `
@set .dot {
  display: inline-block;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
}

@get .dot;
    `, 
    output: `.dot {
  display: inline-block;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2)
}
    `, 
    options: {}
  })
})

test('Props, set and get atrule with compose declaration', async () => {
  await execute({
    input: `
@set .dot {
  display: inline-block;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
}

@set .circle {
  --dot: 50px;
  --dotColor: #c0ffee;
  @props .dot;
  color: #333;
}

@get .circle;
    `,
    output: `.circle {
  --dot: 50px;
  --dotColor: #c0ffee;
  display: inline-block;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
  color: #333
}
    `,
    options: {} 
  })
})


test('Ref, set, props and get atrule with utility declaration', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
@set .dot {
  display: inline-block;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
}

@set .circle {
  --dot: 50px;
  --dotColor: #c0ffee;
  @props .dot;
  color: #333;
}

@get .circle;
  `, { from: undefined })
  console.log(result.css)
})
