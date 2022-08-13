const execute = require('../execute.js')

test('Testing backRight transition', async () => {
  const input = `@use backRight;`
  const output = `.backRight-enter-active {
    animation: backRight 0.5s
}
.backRight-leave-active {
    animation: backRight 0.5s reverse
}
@keyframes backRight {
    0% {
        opacity: 0.7;
        transform: translateX(2000px) scale(.7)
    }
    80% {
        opacity: 0.7;
        transform: translateX(0) scale(.7)
    }
    100% {
        opacity: 1;
        transform: scale(1)
    }
}`
  await execute(input, output, {log: false, file: './examples/transition/backRight.css'})
})
