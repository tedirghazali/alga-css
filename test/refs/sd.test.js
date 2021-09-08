//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Box shadow or sd reference testing', async () => {
  await execute({
    input: `.sdClass {
  ref: sd-3;
}

.sdOtherClass {
  ref: sd-4;
}`, 
    output: `.sdClass {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.sdOtherClass {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
}`, 
    options: {}
  })
})

/*test('Box shadow or sd reference testing', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.sdClass {
  ref: sd-3;
}

.sdOtherClass {
  ref: sd-4;
}
  `, { from: undefined })
  console.log(result.css)
})*/
