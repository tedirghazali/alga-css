//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Rounded or border radius (rd) reference testing', async () => {
  await execute({
    input: `.rdClass {
  ref: rdInherit;
  ref: rd-3;
  ref: rdTopLeft-2;
  ref: rdRight-4;
}

.rdOtherClass {
  ref: rdInitial rdLeft-6px rdBottomRight-1rem rd-5per;
}`, 
    output: `.rdClass {
  border-radius: inherit;
  border-radius: 0.75rem;
  border-top-left-radius: 0.5rem;
  border-right-radius: 1rem;
}

.rdOtherClass {
  border-radius: initial;
  border-left-radius: 6px;
  border-bottom-right-radius: 1rem;
  border-radius: 5%;
}`, 
    options: {}
  })
})

/*test('Rounded or border radius (rd) reference testing', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.rdClass {
  ref: rdInherit;
  ref: rd-3;
  ref: rdTopLeft-2;
  ref: rdRight-4;
}

.rdOtherClass {
  ref: rdInitial rdLeft-6px rdBottomRight-1rem rd-5per;
}
  `, { from: undefined })
  console.log(result.css)
})*/
