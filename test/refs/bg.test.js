//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Background or bg reference testing', async () => {
  await execute({
    input: `.bgClass {
  ref: bgPrimary;
  ref: bgColor.hex(33333);
  ref: bgCenter;
  ref: bgFixed;
  ref: bgClipPadding;
  ref: bgOriginContent;
  ref: bgNorepeat;
  ref: bgCover;
  ref: bgNone;
  ref: bgBlendMultiply;
}

.bgOtherClass {
  ref: bgPrimary-725 bgColor.rgb(24,56,78) bgLeft bgScroll bgClipBorder bgOriginBorder bgRepeatY bgContain bgBlendOverlay;
}`, 
    output: `.bgClass {
  background-color: rgba(13,110,253, 1);
  background-color: #33333;
  background-position: center;
  background-attachment: fixed;
  background-clip: padding-box;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: none;
  background-blend-mode: multiply;
}

.bgOtherClass {
  background-color: rgba(13,110,253, 0.725);
  background-color: rgb(24,56,78);
  background-position: left;
  background-attachment: scroll;
  background-clip: border-box;
  background-origin: border-box;
  background-repeat: repeat-y;
  background-size: contain;
  background-blend-mode: overlay;
}`, 
    options: {}
  })
})

/*test('Background or bg reference testing', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.bgClass {
  ref: bgPrimary;
  ref: bgColor.hex(33333);
  ref: bgCenter;
  ref: bgFixed;
  ref: bgClipPadding;
  ref: bgOriginContent;
  ref: bgNorepeat;
  ref: bgCover;
  ref: bgNone;
  ref: bgBlendMultiply;
}

.bgOtherClass {
  ref: bgPrimary-725 bgColor.rgb(24,56,78) bgLeft bgScroll bgClipBorder bgOriginBorder bgRepeatY bgContain bgBlendOverlay;
}
  `, { from: undefined })
  console.log(result.css)
})*/
