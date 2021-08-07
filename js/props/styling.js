module.exports = {
  bg: {
    color: 'background-color',
    position: 'background-position',
    attrs: {
      fixed: {key: 'background-attachment', val: 'fixed'},
      local: {key: 'background-attachment', val: 'local'},
      scroll: {key: 'background-attachment', val: 'scroll'},
      clip: {
        key: 'background-clip', 
        val: {
          border: 'border-box',
          padding: 'padding-box',
          content: 'content-box',
          text: 'text'
        }
      },
      origin: {
        key: 'background-origin', 
        val: {
          border: 'border-box',
          padding: 'padding-box',
          content: 'content-box'
        }
      },
      norepeat: {key: 'background-repeat', val: 'no-repeat'},
      repeat: {
        key: 'background-repeat', 
        val: {
          base: 'repeat',
          x: 'repeat-x',
          y: 'repeat-y',
          'round': 'round',
          space: 'space'
        }
      },
      auto: {key: 'background-size', val: 'auto'},
      cover: {key: 'background-size', val: 'cover'},
      contain: {key: 'background-size', val: 'contain'},
      none: {key: 'background-image', val: 'none'},
      blend: {
        key: 'background-blend-mode', 
        val: {
          normal: 'normal',
          multiply: 'multiply',
          screen: 'screen',
          overlay: 'overlay',
          darken: 'darken',
          lighten: 'lighten',
          dodge: 'color-dodge',
          burn: 'color-burn',
          hard: 'hard-light',
          soft: 'soft-light',
          difference: 'difference',
          exclusion: 'exclusion',
          hue: 'hue',
          saturation: 'saturation',
          color: 'color',
          luminosity: 'luminosity'
        }
      }
    }
  },
  bd: {
    color: 'border-color',
    width: 'border-width',
    attrs: {
      none: {key: 'border-style', val: 'none'},
      hidden: {key: 'border-style', val: 'hidden'},
      dotted: {key: 'border-style', val: 'dotted'},
      dashed: {key: 'border-style', val: 'dashed'},
      solid: {key: 'border-style', val: 'solid'},
      double: {key: 'border-style', val: 'double'},
      groove: {key: 'border-style', val: 'groove'},
      ridge: {key: 'border-style', val: 'ridge'},
      inset: {key: 'border-style', val: 'inset'},
      outset: {key: 'border-style', val: 'outset'},
      thin: {key: 'border-width', val: 'thin'},
      medium: {key: 'border-width', val: 'medium'},
      thick: {key: 'border-width', val: 'thick'}
    }
  },
  txt: {
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
  },
  outline: {
    color: 'outline-color',
    width: 'outline-width',
    offset: 'outline-offset',
    attrs: {
      none: {key: 'outline-style', val: 'none'},
      hidden: {key: 'outline-style', val: 'hidden'},
      dotted: {key: 'outline-style', val: 'dotted'},
      dashed: {key: 'outline-style', val: 'dashed'},
      solid: {key: 'outline-style', val: 'solid'},
      double: {key: 'outline-style', val: 'double'},
      groove: {key: 'outline-style', val: 'groove'},
      ridge: {key: 'outline-style', val: 'ridge'},
      inset: {key: 'outline-style', val: 'inset'},
      outset: {key: 'outline-style', val: 'outset'},
      thin: {key: 'outline-width', val: 'thin'},
      medium: {key: 'outline-width', val: 'medium'},
      thick: {key: 'outline-width', val: 'thick'}
    }
  }
}
