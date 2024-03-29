const execute = require('../execute.js')

test('Testing breadCrumb component', async () => {
  const input = '@use breadCrumb;'
  const output = `.breadCrumb {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0;
    margin-top: 0;
    margin-bottom: 1rem;
    list-style: none
}
.breadCrumbItem {
    padding: 0 0.5rem 0 0
}
.breadCrumbItem + .breadCrumbItem::before {
    float: left;
    padding-right: 0.5rem;
    color: #6c757d;
    content: "/"
}
.breadCrumbItem a {
    color: #0d6efd;
    text-decoration: none
}
.breadCrumbItem.active a, .breadCrumbItem.disabled a {
    pointer-events: none;
    color: #4a5568
}
.breadCrumbItem:not(.active):not(.disabled):hover a {
    color: #0d6efd;
    text-decoration: underline
}`
  await execute(input, output, {log: false, file: './examples/breadcrumb/breadcrumb.css'})
})
