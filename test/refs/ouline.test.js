//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Outline reference testing', async () => {
  await execute({
    input: `.outlineClass {
  ref: outline-3;
  ref: outlineSolid;
  ref: outlineColor-hex(c0ffee);
  ref: outlineDashed-5;
  ref: outlinePrimary;
}

.outlineOtherClass {
  ref: outlinePrimary-725 outlineColor-rgb(24,56,78) outlineSolid-4;
}`, 
    output: `.outlineClass {
  outline-width: 3px;
  outline-style: solid;
  outline-color: #c0ffee;
  outline-style: dashed;
  outline-width: 5px;
  outline-color: rgba(13,110,253, 1);
}

.outlineOtherClass {
  outline-color: rgba(13,110,253, 0.725);
  outline-color: rgb(24,56,78);
  outline-style: solid;
  outline-width: 4px;
}`, 
    options: {}
  })
})

/*test('Outline reference testing', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.outlineClass {
  ref: outline-3;
  ref: outlineSolid;
  ref: outlineColor.hex(c0ffee);
  ref: outlineDashed-5;
  ref: outlinePrimary;
}

.outlineOtherClass {
  ref: outlinePrimary-725 outlineColor.rgb(24,56,78) outlineSolid-4;
}
  `, { from: undefined })
  console.log(result.css)
})*/
