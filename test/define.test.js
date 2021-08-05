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
@set titik {
  ref: inlineBlock sizingContent wd-0 hg-0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
}

@get titik;
    `, 
    output: `.titik {
  display: inline-block;
  box-sizing: content-box;
  width: 0px;
  height: 0px;
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
@set titik {
  ref: inlineBlock sizingContent wd-0 hg-0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
}

@set bulat {
  --dot: 50px;
  --dotColor: #c0ffee;
  props: titik;
  color: #333;
}

@get bulat;
    `,
    output: `.bulat {
  --dot: 50px;
  --dotColor: #c0ffee;display: inline-block;box-sizing: content-box;width: 0px;height: 0px;border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);border-radius: calc(var(--dot, 10px)/2);
  color: #333
}
    `,
    options: {} 
  })
})

/*test('Ref, set, props and get atrule with utility declaration', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
@set titik2 {
  display: inline-block;
  box-sizing: content-box;
  ref: wd-0;
  ref: hg-0;
  border: calc(var(--dot, 10px)/2) solid var(--dotColor, #3788d8);
  border-radius: calc(var(--dot, 10px)/2);
}

@set bulat {
  --dot: 50px;
  --dotColor: #c0ffee;
  ref: primary-4;
}

@set bulatan {
  props: bulat;
}

.buwat {
  props: titik2;
  ref: grid;
}

.buwat2 {
  props: titik2;
}

@get bulat;
@get bulatan;
  `, { from: undefined })
  console.log(result.css)
})*/
