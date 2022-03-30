const execute = require('../execute.js')

test('Testing alert component', async () => {
  const input = `@use alert {
    type: success, error;
  }`
  const output = `.alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 5px solid #c3c0c0;
    border-radius: 0.375rem;
    background-color: #f1ebeb;
    padding: 1rem;
    color: #5c5b5b
}
.alertContent {
    flex-grow: 1
}
.alertTitle {
    margin: 0 0 7px 0
}
.alertText {
    margin: 0
}
.alertAction {
    cursor: pointer
}
.alertSuccess {
    border-color: #008200;
    background-color: #79ec79;
    color: #2d5a2d
}
.alertError {
    border-color: #c10202;
    background-color: #f9a1a1;
    color: #5c3939
}`
  await execute(input, output, {log: false, file: './examples/notification/alert.css'})
})
