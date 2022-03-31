module.exports = {
  justify: {
    start: {key: 'justify-content', val: 'flex-start'},
    end: {key: 'justify-content', val: 'flex-end'},
    center: {key: 'justify-content', val: 'center'},
    between: {key: 'justify-content', val: 'space-between'},
    evenly: {key: 'justify-content', val: 'space-evenly'},
    around: {key: 'justify-content', val: 'space-around'}
  },
  items: {
    start: {key: 'align-items', val: 'flex-start'},
    end: {key: 'align-items', val: 'flex-end'},
    center: {key: 'align-items', val: 'center'},
    baseline: {key: 'align-items', val: 'baseline'},
    stretch: {key: 'align-items', val: 'stretch'}
  },
  attrs: {
    col: {key: 'flex-direction', val: {base: 'column', 'reverse': 'column-reverse'}},
    row: {key: 'flex-direction', val: {base: 'row', 'reverse': 'row-reverse'}},
    wrap: {key: 'flex-wrap', val: {base: 'wrap', 'reverse': 'wrap-reverse'}},
    nowrap: {key: 'flex-wrap', val: 'nowrap'},
    grow: {key: 'flex-grow', val: 1},
    nogrow: {key: 'flex-grow', val: 0},
    shrink: {key: 'flex-shrink', val: 1},
    noshrink: {key: 'flex-shrink', val: 0},
    none: {key: 'flex', val: 'none'},
    auto: {key: 'flex', val: '1 1 auto'},
    initial: {key: 'flex', val: '0 1 auto'},
  },
  globals: ['direction', 'wrap', 'grow', 'shrink']
}
