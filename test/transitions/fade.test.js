const execute = require('../execute.js')

test('Testing fade transition', async () => {
  const input = `@use fade;`
  const output = `.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease
}
.fade-enter-from, .fade-leave-to {
    opacity: 0
}
.fade-enter-to, .fade-leave-from {
    opacity: 1
}`
  await execute(input, output, {log: false, file: './examples/transition/fade.css'})
})
