const execute = require('../execute.js')

test('Testing picker or dropdown component', async () => {
  const input = '@use picker;'
  const output = `.picker {
    width: auto
}
.pickerContent {
    display: block;
    position: relative
}
.picker.dropdown .pickerContent {
    display: inline-block
}
.pickerBackdrop {
    position: fixed;
    z-index: 5;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.picker.active .pickerBackdrop {
    display: block
}
.pickerToggler {
    padding: 0.5rem
}
.select.pickerToggler {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    cursor: default
}
.pickerBody, .pickerMenu {
    position: absolute;
    z-index: 6;
    top: 2.5rem;
    left: 0;
    width: 240px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    display: none
}
.pickerBody {
    padding: 0.75rem;
    border-radius: 0.375rem
}
.pickerMenu {
    border-radius: 0.375rem
}
.pickerMenu .pickerWrap {
    padding: 0.5rem;
    border-bottom: 1px solid #d9d9d9
}
.pickerMenu .pickerGroup {
    overflow-y: auto;
    max-height: calc(10 * 42px)
}
.pickerMenu .pickerItem {
    display: block;
    padding: 0.675rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541;
    cursor: default
}
.pickerMenu .pickerItem:last-child {
    border-bottom: 0
}
.pickerMenu .pickerItem:hover {
    background-color: #ededed
}
.pickerMenu .pickerItem.active {
    pointer-events: none;
    border-color: #4890eb;
    background-color: #4c9bff;
    color: #fff
}
.pickerMenu.pickerSizing {
    overflow-y: auto;
    max-height: calc(10 * 42px)
}
.suggestion .pickerMenu, .fill .pickerBody {
    width: 100%
}
.pickerEnd .pickerBody, .pickerEnd .pickerMenu {
    right: 0;
    left: auto
}
.picker.active .input.pickerToggler, .picker.active .select.pickerToggler {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
}
.picker.active .pickerMenu {
    border-top-right-radius: 0;
    border-top-left-radius: 0
}
.picker.active .pickerBody, .picker.active .pickerMenu {
    display: block
}`
  await execute(input, output, {log: false, file: './examples/picker/picker.css'})
})
