const execute = require('../execute.js')

test('Testing bounce transition', async () => {
  const input = `@use bounce;`
  const output = `.bounce-enter-active {
    animation: bounce 0.5s
}
.bounce-leave-active {
    animation: bounce 0.5s reverse
}
@keyframes bounce {
    0% {
        transform: scale(0)
    }
    50% {
        transform: scale(1.25)
    }
    100% {
        transform: scale(1)
    }
}`
  await execute(input, output, {log: false, file: './examples/transition/bounce.css'})
})
