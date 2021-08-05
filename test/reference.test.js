const postcss = require('postcss')
const algacss = require('../js/')

async function execute(arg = { input: 'a {}', output: 'a {}', options: {} }) {
  let result = await postcss([
    algacss(arg.options)
  ]).process(arg.input, { from: undefined })
  expect(result.css).toEqual(arg.output)
  expect(result.warnings()).toHaveLength(0)
}

test('Test the reference feature', async () => {
  await execute({
    input: `.ref {
  ref: sizingContent;
  ref: wd-0;
  ref: hg-0;
  ref: flexCenter relative;
  border-radius: calc(var(--dot, 10px)/2);
}
    `, 
    output: `.ref {
  box-sizing: content-box;
  width: 0px;
  height: 0px;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: calc(var(--dot, 10px)/2);
}
    `, 
    options: {}
  })
})

/*test('Reference of Flexbox', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.flexbox1 {
  ref: flex flexRow flex-1;
}

.flexbox2 {
  ref: flexCenter;
  ref: flexCol;
  ref: flexAuto;
}

.flexbox3 {
  ref: flexItemsCenter;
  ref: flexRowReverse;
  ref: flexInitial;
}

.gridPage {
  props: page;
}

.gridPage2 {
  props: page;
}
  `, { from: undefined })
  console.log(result.css)
})*/

/*test('Reference of CSS utility', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.ref {
  ref: inlineBlock;
  ref: sizingContent;
  ref: wd-0;
  ref: hg-0;
  ref: flexCenter relative;
  border-radius: calc(var(--dot, 10px)/2);
}
  `, { from: undefined })
  console.log(result.css)
})*/
