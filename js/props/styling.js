module.exports = {
  bg: {
    color: 'background-color',
    position: 'background-position',
    attrs: {
      fixed: {key: 'background-attachment', val: 'fixed'},
      local: {key: 'background-attachment', val: 'local'},
      scroll: {key: 'background-attachment', val: 'scroll'},
      clip: {key: 'background-clip', val: {
        border: 'border-box',
        padding: 'padding-box',
        content: 'content-box',
        text: 'text'
      }},
      origin: {key: 'background-origin', val: {
        border: 'border-box',
        padding: 'padding-box',
        content: 'content-box'
      }},
      norepeat: {key: 'background-repeat', val: 'no-repeat'},
      repeat: {key: 'background-repeat', val: {
        base: 'repeat',
        x: 'repeat-x',
        y: 'repeat-y',
        'round': 'round',
        space: 'space'
      }},
      auto: {key: 'background-size', val: 'auto'},
      cover: {key: 'background-size', val: 'cover'},
      contain: {key: 'background-size', val: 'contain'},
      none: {key: 'background-image', val: 'none'},
      blend: {key: 'background-blend-mode', val: {
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
      }}
    }
  },
  bd: {
    color: 'border-color',
    width: 'border-width',
    attrs: {
      none: {key: 'border-style', 'none'},
      hidden: {key: 'border-style', 'hidden'},
      dotted: {key: 'border-style', 'dotted'},
      dashed: {key: 'border-style', 'dashed'},
      solid: {key: 'border-style', 'solid'},
      double: {key: 'border-style', 'double'},
      groove: {key: 'border-style', 'groove'},
      ridge: {key: 'border-style', 'ridge'},
      inset: {key: 'border-style', 'inset'},
      outset: {key: 'border-style', 'outset'},
      thin: {key: 'border-width', 'thin'},
      medium: {key: 'border-width', 'medium'},
      thick: {key: 'border-width', 'thick'}
    }
  },
  outline: {
    color: 'outline-color',
    width: 'outline-width',
    offset: 'outline-offset',
    attrs: {
      none: {key: 'outline-style', 'none'},
      hidden: {key: 'outline-style', 'hidden'},
      dotted: {key: 'outline-style', 'dotted'},
      dashed: {key: 'outline-style', 'dashed'},
      solid: {key: 'outline-style', 'solid'},
      double: {key: 'outline-style', 'double'},
      groove: {key: 'outline-style', 'groove'},
      ridge: {key: 'outline-style', 'ridge'},
      inset: {key: 'outline-style', 'inset'},
      outset: {key: 'outline-style', 'outset'},
      thin: {key: 'outline-width', 'thin'},
      medium: {key: 'outline-width', 'medium'},
      thick: {key: 'outline-width', 'thick'}
    }
  }
}
