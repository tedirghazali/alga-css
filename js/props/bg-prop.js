module.exports = {
  property: {
    bg: 'background',
    bgColor: 'background-color',
    bgPosition: 'background-position',
    bgAttach: 'background-attachment',
    bgClip: 'background-clip',
    bgOrigin: 'background-origin',
    bgRepeat: 'background-repeat',
    bgSize: 'background-size',
    bgImage: 'background-image',
    bgBlend: 'background-blend-mode'
  },
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
}
