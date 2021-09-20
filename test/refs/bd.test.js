//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Border or bd reference testing', async () => {
  await execute({
    input: `.bdClass {
  ref: bdPrimary;
  ref: bdColor-hex(33333);
  ref: bdSolid-4;
  ref: bdTopDashed-5;
  ref: bdTopPrimary;
  ref: bdRightColor-hex(c0ffee);
  ref: bdCollapse;
  ref: bdBlockStartSolid-7;
  ref: bdBlockStartSuccess-525;
  ref: bdInlineStartDashed-2;
  ref: bdInlineStartColor-rgb(0,0,0);
  ref: bdY-8;
}

.bdOtherClass {
  ref: bdPrimary-725 bdLeftColor-rgb(24,56,78) bdLeft-4 bdX-5 bdBlockEnd-7 bdBlockEndSolid bdInlineEndSolid bdInlineEnd-4;
}`, 
    output: `.bdClass {
  border-color: rgba(13,110,253, 1);
  border-color: #33333;
  border-style: solid;
  border-width: 4px;
  border-top-style: dashed;
  border-top-width: 5px;
  border-top-color: rgba(13,110,253, 1);
  border-right-color: #c0ffee;
  border-collapse: collapse;
  border-block-start-style: solid;
  border-block-start-width: 7px;
  border-block-start-color: rgba(25,135,84, 0.525);
  border-inline-start-style: dashed;
  border-inline-start-width: 2px;
  border-inline-start-color: rgb(0,0,0);
  border-top-width: 8px;
  border-bottom-width: 8px;
}

.bdOtherClass {
  border-color: rgba(13,110,253, 0.725);
  border-left-color: rgb(24,56,78);
  border-left-width: 4px;
  border-right-width: 5px;
  border-left-width: 5px;
  border-block-end-width: 7px;
  border-block-end-style: solid;
  border-inline-end-style: solid;
  border-inline-end-width: 4px;
}`, 
    options: {}
  })
})

/*test('Border or bd reference testing', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.bdClass {
  ref: bdPrimary;
  ref: bdColor.hex(33333);
  ref: bdSolid-4;
  ref: bdTopDashed-5;
  ref: bdTopPrimary;
  ref: bdRightColor.hex(c0ffee);
  ref: bdCollapse;
  ref: bdBlockStartSolid-7;
  ref: bdBlockStartSuccess-525;
  ref: bdInlineStartDashed-2;
  ref: bdInlineStartColor.rgb(0,0,0);
  ref: bdY-8;
}

.bdOtherClass {
  ref: bdPrimary-725 bdLeftColor.rgb(24,56,78) bdLeft-4 bdX-5 bdBlockEnd-7 bdBlockEndSolid bdInlineEndSolid bdInlineEnd-4;
}
  `, { from: undefined })
  console.log(result.css)
})*/
