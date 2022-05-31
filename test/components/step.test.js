const execute = require('../execute.js')

test('Testing step wizard component', async () => {
  const input = `@use step;`
  const output = `.step {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center
}
.step::before {
    content: " ";
    position: absolute;
    top: 27px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: #eee;
    border-radius: 3px;
    z-index: 4
}
.stepItem {
    position: relative;
    text-align: center;
    z-index: 5;
    color: #999;
    flex: 1 1 auto
}
.stepFeature {
    display: grid;
    place-items: center;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #999;
    color: #fff;
    border: 10px solid #fff
}
.stepItem.active {
    color: #428bca
}
.stepItem.active .stepFeature {
    background-color: #428bca
}
.stepTitle {
    margin-top: 0.5rem;
    margin-bottom: 0.375rem
}
.stepSubtitle {
    margin: 0
}`
  await execute(input, output, {log: false, file: './examples/step/step.css'})
})
