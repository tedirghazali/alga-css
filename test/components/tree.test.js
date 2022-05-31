const execute = require('../execute.js')

test('Testing tree view component', async () => {
  const input = `@use tree;`
  const output = `.tree {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin: 0;
    list-style: none;
    flex-direction: column
}
.tree > .treeItem {
    padding: 0.25rem 0 0.25rem 1rem
}
.tree > .treeItem > .treeLink {
    display: block;
    border-radius: 0.25rem;
    color: #4a5568;
    text-decoration: none;
    padding: 0.675rem 1rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out
}
.tree > .treeItem > .tree {
    display: none
}
.tree > .treeItem.active > .treeLink {
    font-weight: bold;
    background-color: #f6f8f9
}
.tree > .treeItem.active > .tree {
    display: flex
}
.tree > .treeItem:hover > .treeLink {
    font-weight: bold;
    background-color: #d2f4ea
}`
  await execute(input, output, {log: false, file: './examples/tree/tree.css'})
})
