module.exports = {
  dark: {
    media: 'prefers-color-scheme',
    prefers: 'dark'
  },
  light: {
    media: 'prefers-color-scheme',
    prefers: 'light'
  },
  mode: {
    media: 'prefers-color-scheme',
    selector: '[data-mode=dark]',
    prefers: 'dark'
  },
  reduce: {
    media: 'prefers-reduced-motion',
    prefers: 'reduce'
  }
}
