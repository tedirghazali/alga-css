const overflowVal = {auto: 'auto', hidden: 'hidden', visible: 'visible', scroll: 'scroll'}
const overscrollVal = {auto: 'auto', contain: 'contain', none: 'none'}
const contentVal = {start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly'}
const selfVal = {start: 'start', end: 'end', center: 'center', auto: 'auto', stretch: 'stretch'}

module.exports = {
  object: {
    contain: {key: 'object-fit', val: 'contain'}, 
    cover: {key: 'object-fit', val: 'cover'}, 
    fill: {key: 'object-fit', val: 'fill'}, 
    none: {key: 'object-fit', val: 'none'}, 
    scale: {key: 'object-fit', val: 'scale-down'}, 
    top: {key: 'object-position', val: {base: 'top', right: 'top right', left: 'top left'}}, 
    right: {key: 'object-position', val: 'right'}, 
    bottom: {key: 'object-position', val: {base: 'bottom', right: 'bottom right', left: 'bottom left'}}, 
    left: {key: 'object-position', val: 'left'}
  },
  overflow: {
    auto: {key: 'overflow', val: 'auto'},
    hidden: {key: 'overflow', val: 'hidden'},
    visible: {key: 'overflow', val: 'visible'},
    scroll: {key: 'overflow', val: 'scroll'},
    touch: {key: '-webkit-overflow-scrolling', val: 'touch'},
    x: {key: 'overflow-x', val: overflowVal},
    y: {key: 'overflow-y', val: overflowVal},
  },
  overscroll: {
    auto: {key: 'overscroll-behavior', val: 'auto'},
    contain: {key: 'overscroll-behavior', val: 'contain'},
    none: {key: 'overscroll-behavior', val: 'none'},
    x: {key: 'overscroll-behavior-x', val: overscrollVal},
    y: {key: 'overscroll-behavior-y', val: overscrollVal},
  },
  justify: {
    content: { key: 'justify-content', val: contentVal},
    items: { key: 'justify-items', val: {start: 'start', end: 'end', center: 'center', stretch: 'stretch'}},
    self: { key: 'justify-self', val: selfVal}
  },
  align: {
    content: { key: 'align-content', val: contentVal},
    items: { key: 'align-items', val: {start: 'flex-start', end: 'flex-end', center: 'center', baseline: 'baseline', stretch: 'stretch'}},
    self: { key: 'align-self', val: {start: 'flex-start', end: 'flex-end', center: 'center', auto: 'auto', stretch: 'stretch'}},
    baseline: { key: 'vertical-align', val: 'baseline'},
    top: { key: 'vertical-align', val: 'top'},
    middle: { key: 'vertical-align', val: 'middle'},
    bottom: { key: 'vertical-align', val: 'bottom'},
    text: { key: 'vertical-align', val: {top: 'text-top', bottom: 'text-bottom'}},
    vertical: { key: 'vertical-align', val: {inherit: 'inherit', initial: 'initial', revert: 'revert', unset: 'unset'}}
  },
  place: {
    content: { key: 'place-content', val: {start: 'start', end: 'end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly', stretch: 'stretch'}},
    items: { key: 'place-items', val: {start: 'start', end: 'end', center: 'center', stretch: 'stretch'}},
    self: { key: 'place-self', val: selfVal}
  },
  auto: {
    flow: { key: 'grid-auto-flow', val: {row: 'row', column: 'column', rowdense: 'row dense', coldense: 'column dense'}},
    cols: { key: 'grid-auto-columns', val: {auto: 'auto', 'min': 'min-content', 'max': 'max-content', fr: 'minmax(0px, 1fr)'}},
    rows: { key: 'grid-auto-rows', val: {auto: 'auto', 'min': 'min-content', 'max': 'max-content', fr: 'minmax(0px, 1fr)'}},
  },
  word: {
    wrap: {key: 'overflow-wrap', val: {base: 'break-word', anywhere: 'anywhere', normal: 'normal'}},
    'break': {key: 'word-break', val: {base: 'break-word', all: 'break-all', normal: 'normal'}},
  }
}
