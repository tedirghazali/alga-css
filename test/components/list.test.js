const execute = require('../execute.js')

test('Testing list group component', async () => {
  const input = '@use list;'
  const output = `.list {
    width: 100%;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 0.375rem
}
.list .listWrap {
    padding: 0.5rem;
    border-bottom: 1px solid #d9d9d9
}
.list .listGroup {
    overflow-y: auto;
    max-height: calc(10 * 36px)
}
.list .listItem {
    display: block;
    padding: 0.675rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541
}
.list .listItem:last-child {
    border-bottom: 0
}
.list .listItem:hover {
    background-color: #ededed
}
.list .listItem.active {
    pointer-events: none;
    border-color: #4890eb;
    background-color: #4c9bff;
    color: #fff
}
.list.sizing {
    overflow-y: auto;
    max-height: calc(10 * 36px)
}`
  await execute(input, output, {log: false, file: './examples/list/list.css'})
})
