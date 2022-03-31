module.exports = {
  property: {
    txtColor: 'color',
    txtSize: 'font-size',
    txtAlign: 'text-align',
    txtWeight: 'font-weight',
    txtStyle: 'font-style',
    txtTransform: 'text-transform',
    txtDecoration: 'text-decoration',
    txtDecorationLine: 'text-decoration-line',
    txtDecorationStyle: 'text-decoration-style'
  },
  color: 'color',
  width: {
    key: 'font-size', 
    val: {
      xxsmall: 'xx-small',
      xsmall: 'x-small',
      small: 'small',
      medium: 'medium',
      large: 'large',
      xlarge: 'x-large',
      xxlarge: 'xx-large',
      xxxlarge: 'xxx-large',
      smaller: 'smaller',
      larger: 'larger'
    }
  },
  position: {
    key: 'text-align', 
    val: {
      start: 'start',
      end: 'end',
      left: 'left',
      right: 'right',
      center: 'center',
      justify: 'justify',
      all: 'justify-all',
      'match': 'match-parent'
    }
  },
  weight: {
    key: 'font-weight', 
    val: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      heavy: 900,
      extraheavy: 950,
      lighter: 'lighter',
      bolder: 'bolder'
    }
  },
  style: {
    key: 'font-style', 
    val: {
      normal: 'normal',
      italic: 'italic',
      oblique: 'oblique'
    }
  },
  transform: {
    key: 'text-transform', 
    val: {
      notransform: 'none',
      capitalize: 'capitalize',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      fullwidth: 'full-width',
      fullsize: 'full-size-kana'
    }
  },
  decoration: {
    key: 'text-decoration-line', 
    val: {
      nodecoration: 'none',
      underline: 'underline',
      overline: 'overline',
      strikethrough: 'line-through'
    }
  },
  'text-decoration-style': ['solid', 'double', 'dotted', 'dashed', 'wavy']
}
