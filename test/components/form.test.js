const execute = require('../execute.js')

test('Testing form component', async () => {
  const input = `@use form {
    field: label, button;
  }`
  const output = `.label {
    display: block;
    margin-bottom: 0.25rem;
    color: #283541
}
.button {
    display: inline-flex;
    align-items: center;
    font-weight: 400;
    color: #283541;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    background-color: #f0f0f0;
    border: 1px solid #d6d6d6;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.375rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.button[type=button]:hover {
    background-color: #e9e9e9
}
.button[type=button]:active {
    border-color: #bbbbbb;
    background-color: #bfbfbf
}`
  await execute(input, output, {log: false, file: './examples/form/form.css'})
})
