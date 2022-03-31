module.exports = {
  float: {
    key: 'float',
    val: {right: 'right', left: 'left', none: 'none'}
  },
  clear: {
    key: 'clear',
    val: {right: 'right', left: 'left', both: 'both', none: 'none'}
  },
  decoration: {
    key: 'box-decoration-break',
    val: {'slice': 'slice', clone: 'clone'}
  },
  sizing: {
    key: 'box-sizing',
    val: {border: 'border-box', content: 'content-box'}
  },
  inline: {
    key: 'display',
    val: {base: 'inline', block: 'inline-block', flex: 'inline-flex', grid: 'inline-grid', tabular: 'inline-table'}
  },
  tb: {
    key: 'display',
    val: {base: 'table', caption: 'table-caption', cell: 'table-cell', scope: 'table-cell', col: 'table-column', cols: 'table-column-group', row: 'table-row', rows: 'table-row-group', body: 'table-row-group', head: 'table-header-group', foot: 'table-footer-group'}
  },
  flow: {
    key: 'display',
    val: {base: 'flow', root: 'flow-root'}
  },
  select: { 
    key: 'user-select',
    val: {none: 'none', text: 'text', all: 'all', auto: 'auto', contain: 'contain'}
  },
  resize: { 
    key: 'resize',
    val: {base: 'both', none: 'none', y: 'vertical', x: 'horizontal'}
  },
  events: { 
    key: 'pointer-events',
    val: {auto: 'auto', none: 'none'}
  },
  appearance: { 
    key: 'appearance',
    val: {auto: 'auto', none: 'none'}
  },
  cursor: { 
    key: 'cursor',
    val: {base: 'default', none: 'none', auto: 'auto', pointer: 'pointer', wait: 'wait', text: 'text', move: 'move', disabled: 'not-allowed', grab: 'grab', cross: 'crosshair', cell: 'cell', grabbing: 'grabbing', copy: 'copy', alias: 'alias', progress: 'progress', vertical: 'vertical-text', context: 'context-menu', col: 'col-resize', row: 'row-resize', n: 'n-resize', e: 'e-resize', s: 's-resize', w: 'row-resize', ne: 'ne-resize', nw: 'nw-resize', se: 'se-resize', sw: 'sw-resize', ew: 'ew-resize', ns: 'ns-resize', nesw: 'nesw-resize', nwse: 'nwse-resize', 'in': 'zoom-in', 'out': 'zoom-out'}
  },
  caption: { 
    key: 'caption-side',
    val: {top: 'top', bottom: 'bottom'}
  }
}
