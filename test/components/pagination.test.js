const execute = require('../execute.js')

test('Testing pagination component', async () => {
  const input = '@use pagination;'
  const output = `.pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 0;
    margin: 0;
    list-style: none
}
.pagination .item .link {
    display: block;
    padding: 0.5rem 1rem;
    color: #4a5568;
    text-decoration: none
}
.pagination .item:hover .link {
    background-color: #eeeeee
}
.pagination .item.disabled .link {
    pointer-events: none;
    background-color: #eeeeee
}
.pagination .item.active .link {
    pointer-events: none;
    border-color: #4890eb;
    background-color: #4c9bff;
    color: #fff
}
.pagination.dense .item .link {
    border-style: solid;
    border-color: #cbcbcb;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-right-width: 0px;
    border-left-width: 1px;
    min-width: 10px;
    text-align: center
}
.pagination.dense .item:first-child .link {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px
}
.pagination.dense .item:last-child .link {
    border-right-width: 1px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px
}
.pagination.dense .item.ellipsis .link {
    pointer-events: none;
    padding-left: 0.675rem;
    padding-right: 0.675rem;
    border-right-color: #ededed;
    border-top-color: #ededed;
    border-bottom-color: #ededed;
    background-color: #f4f4f4
}
.pagination.sparse .item .link {
    border: 1px solid #cbcbcb;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    border-radius: 5px;
    min-width: 10px;
    text-align: center
}
.pagination.sparse .item:first-child .link {
    margin-left: 0
}
.pagination.sparse .item:last-child .link {
    margin-right: 0
}
.pagination.sparse .item.ellipsis .link {
    pointer-events: none;
    border: none;
    padding-left: 0.25rem;
    padding-right: 0.25rem
}`
  await execute(input, output, {log: false, file: './examples/pagination/pagination.css'})
})
