const execute = require('../execute.js')

test('Testing table component', async () => {
  const input = '@use table;'
  const output = `.table {
    width: 100%;
    border-collapse: collapse
}
.table tr {
    border-bottom: 1px solid rgba(0,0,0,0.25)
}
.table thead {
    border-bottom: 3px solid rgba(0,0,0,0.25)
}
.table tfoot {
    border-top: 3px solid rgba(0,0,0,0.25)
}
.table tr:last-child {
    border-bottom-width: 0px
}
.table tr th, .table tr td {
    text-align: left;
    vertical-align: middle;
    padding: 0.75rem
}
.tableBorder {
    border-top: 1px solid rgba(0,0,0,0.25);
    border-right: 1px solid rgba(0,0,0,0.25);
    border-bottom: 1px solid rgba(0,0,0,0.25)
}
.tableBorder th, .tableBorder td {
    border-left: 1px solid rgba(0,0,0,0.25)
}
.tableResponsive {
    overflow-x: auto
}`
  await execute(input, output, {log: false, file: './examples/table/table.css'})
})
