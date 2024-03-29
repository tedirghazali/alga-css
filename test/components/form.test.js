const execute = require('../execute.js')

test('Testing form component', async () => {
  const input = `@use form;`
  const output = `.label {
    display: block;
    margin-bottom: 0.25rem;
    color: inherit
}
.input, .select {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: #f9f9f9;
    background-clip: padding-box;
    appearance: none;
    color: inherit;
    border: 1px solid #d9d9d9;
    border-radius: 0.375rem;
    outline: 0;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
}
.input::placeholder, .select::placeholder {
    color: #555555
}
.input:focus, .select:focus {
    border-color: #1d84b6;
    background-color: #f7faff
}
.input[disabled], .input[readonly], .input.disabled, .select[disabled], .select[readonly], .select.disabled {
    border-color: #d6d6d6;
    background-color: #f0f0f0;
    cursor: default
}
.input[disabled], .input.disabled, .select[disabled], .select.disabled {
    color: #9b9b9b;
    user-select: none;
    pointer-events: none
}
.input.plainText {
    background-color: transparent;
    border-color: transparent;
    padding-left: 0;
    padding-right: 0
}
.input.valid, .validated :valid {
    border-color: #198754;
    background-color: #f1fff8;
    padding-right: calc(1.5em + .75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem)
}
.validMessage {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #198754
}
.validTooltip {
    position: absolute;
    top: 100%;
    z-index: 5;
    display: none;
    max-width: 100%;
    padding: 0.25rem 0.5rem;
    margin-top: 0.1rem;
    font-size: 0.875rem;
    color: #fff;
    background-color: rgba(25,135,84,0.9);
    border-radius: 0.25rem
}
.input.invalid, .validated :invalid {
    border-color: #dc3545;
    background-color: #fbf1f2;
    padding-right: calc(1.5em + .75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem)
}
.invalidMessage {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545
}
.invalidTooltip {
    position: absolute;
    top: 100%;
    z-index: 5;
    display: none;
    max-width: 100%;
    padding: 0.25rem 0.5rem;
    margin-top: 0.1rem;
    font-size: 0.875rem;
    color: #fff;
    background-color: rgba(220,53,69,0.9);
    border-radius: 0.25rem
}
.valid ~ .validMessage, .valid ~ .validTooltip, .validated :valid ~ .validMessage, .validated :valid ~ .validTooltip, .invalid ~ .invalidMessage, .invalid ~ .invalidTooltip, .validated :invalid ~ .invalidMessage, .validated :invalid ~ .invalidTooltip {
    display: block
}
textarea.input {
    min-height: 6.5rem;
    resize: none
}
.select:not([multiple]) {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px
}
select.select:not([multiple]) {
    padding: 0.5rem
}
.select[multiple] {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}
.select[multiple] option {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    outline: 0
}
@media (prefers-color-scheme: dark) {
    .input, .select {
        background-color: #242424;
        border-color: #5f5f5f
    }
    .input::placeholder, .select::placeholder {
        color: #d4d4d4
    }
    .input:focus, .select:focus {
        background-color: #242424
    }
    .input[disabled], .input[readonly], .input.disabled, .select[disabled], .select[readonly], .select.disabled {
        background-color: #242424;
        border-color: #5f5f5f
    }
    .input.plainText {
        background-color: transparent;
        border-color: transparent
    }
    .input.valid, .validated :valid {
        background-color: #242424
    }
    .input.invalid, .validated :invalid {
        background-color: #242424
    }
}
.check {
    display: inline-flex;
    align-items: center
}
.check .checkInput {
    width: 1.5em;
    height: 1.5em;
    appearance: none;
    border: 1px solid #d9d9d9
}
.check .checkInput[type="checkbox"] {
    border-radius: 0.25rem
}
.check .checkInput[type="radio"] {
    border-radius: 0.75rem
}
.check .checkInput:checked {
    border-color: #1d84b6;
    background-color: #1d84b6
}
.check .checkInput[disabled], .check .checkInput.disabled {
    border-color: #d6d6d6;
    background-color: #f0f0f0;
    pointer-events: none
}
.check .checkInput:checked[disabled], .check .checkInput:checked.disabled {
    background-color: #bbb
}
.check .checkInput[disabled] ~ .checkLabel, .check .checkInput.disabled ~ .checkLabel {
    color: #9b9b9b;
    cursor: default
}
.check .checkInput[type="checkbox"]:checked {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")
}
.check .checkInput[type="checkbox"]:indeterminate {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")
}
.check .checkInput[type="radio"]:checked {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")
}
.check .checkLabel {
    display: inline-block;
    padding-left: 0.25rem
}
.check.switch .checkInput {
    width: 2.85em;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
    background-position: left center;
    border-radius: 2em;
    transition: background-position .15s ease-in-out
}
.check.switch .checkInput:checked {
    background-position: right center;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")
}
@media (prefers-color-scheme: dark) {
    .check .checkInput {
        background-color: #242424;
        border-color: #5f5f5f
    }
    .check .checkInput[disabled], .check .checkInput.disabled {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .check .checkInput:checked[disabled], .check .checkInput:checked.disabled {
        background-color: #2f2f2f
    }
}
.group {
    position: relative;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: stretch
}
.group .groupItem {
    flex: 1 1 auto;
    border-radius: 0
}
.group .groupItem:first-child {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    border-right: none
}
.group .groupItem:last-child {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem
}
.group :not(.groupItem:first-child):not(.groupItem:last-child) {
    border-right: none
}
.group .input:focus, .group .select:focus {
    border-color: #d9d9d9
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
.button:hover {
    background-color: #e9e9e9
}
.button:active {
    border-color: #bbbbbb;
    background-color: #bfbfbf
}
@media (prefers-color-scheme: dark) {
    .button {
        background-color: #2f2f2f;
        border-color: #5f5f5f;
        color: #5f5f5f
    }
}`
  await execute(input, output, {log: false, file: './examples/form/form.css'})
})
