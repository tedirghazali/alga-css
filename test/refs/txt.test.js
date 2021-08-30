//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Testing the text reference', async () => {
  await execute({
    input: `.textClass {
  ref: txtPrimary;
  ref: txtColor.hex(009900);
  ref: txt-5;
  ref: txtStart;
  ref: txtBold;
  ref: txtItalic;
  ref: txtCapitalize;
  ref: txtUnderline;
}

.textOtherClass {
  ref: txtPrimary-625 txtColor.rgb(24,56,78) txtEnd txtBold-3 txtOblique txtLowercase txtOverlineWavy;
}`, 
    output: `.textClass {
  color: rgba(13,110,253, 1);
  color: #009900;
  font-size: 5pt;
  text-align: start;
  font-weight: 700;
  font-style: italic;
  text-transform: capitalize;
  text-decoration-line: underline;
}

.textOtherClass {
  color: rgba(13,110,253, 0.625);
  color: rgb(24,56,78);
  text-align: end;
  font-weight: 700;
  font-size: 3pt;
  font-style: oblique;
  text-transform: lowercase;
  text-decoration-line: overline;
  text-decoration-style: wavy;
}`, 
    options: {}
  })
})

/*test('Testing the text reference', async () => {
  let result = await postcss([
    algacss()
  ]).process(`
.textClass {
  ref: txtPrimary;
  ref: txtColor.hex(009900);
  ref: txt-5;
  ref: txtStart;
  ref: txtBold;
  ref: txtItalic;
  ref: txtCapitalize;
  ref: txtUnderline;
}

.textOtherClass {
  ref: txtPrimary-625 txtColor.rgb(24,56,78) txtEnd txtBold-3 txtOblique txtLowercase txtOverlineWavy;
}
  `, { from: undefined })
  console.log(result.css)
})*/
