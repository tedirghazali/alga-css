const postcss = require('postcss')
const algacss = require('../js/')
const execute = require('./execute.js')

test('Testing the CSS reference', async () => {
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

/*test('Testing the CSS reference', async () => {
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
