module.exports = {
  color: 'color',
  width: {
    key: 'font-size', 
    val: {
      '2xs': 'xx-small',
      xs: 'x-small',
      sm: 'small',
      md: 'medium',
      lg: 'large',
      xl: 'x-large',
      '2xl': 'xx-large',
      '3xl': 'xxx-large',
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
      extraheavy: 950
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
    key: 'text-decoration', 
    val: {
      nodecoration: 'none',
      underline: 'underline',
      overline: 'overline',
      strikethrough: 'line-through'
    }
  },
  'decoration-style': ['solid', 'double', 'dotted', 'dashed', 'wavy'],
  'thickness': 'text-decoration-thickness',
  'shadow': 'text-shadow'
}
