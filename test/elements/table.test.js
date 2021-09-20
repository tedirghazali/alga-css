//const postcss = require('postcss')
//const algacss = require('../../js/')
const execute = require('../execute.js')

test('Table element style testing', async () => {
  /*let result = await postcss([
    algacss({})
  ]).process(`
@inject table;
  `, { from: undefined })
  console.log(result.css)*/
  execute({
    input: `@inject table;`,
    output: `.table {
    width: 100%;
    margin-bottom: 1rem;
    caption-side: bottom;
    border-spacing: 0px;
    border-collapse: collapse;
    color: #212529;
    border-color: #dee2e6
}
.tableCaption, caption {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: left;
    color: #6c757d
}
.tableScope, th {
    text-align: inherit;
    text-align: -webkit-match-parent
}
.tableHead, thead, 
  .tableBody, tbody, 
  .tableFoot, tfoot, 
  .tableRow, tr, 
  .tableCell, td, 
  .tableScope, th {
    border-color: inherit;
    border-style: solid;
    border-width: 0px
}
.table > :not(.tableCaption) > * > *,
  .table > :not(caption) > * > * {
    padding: 0.5rem;
    border-bottom-width: 1px;
    background-color: transparent
}
.tableSmall > :not(.tableCaption) > * > *,
  .tableSmall > :not(caption) > * > * {
    padding: 0.25rem;
    border-bottom-width: 1px;
    background-color: transparent
}
.table.tableLarge > :not(.tableCaption) > * > *,
  .table.tableLarge > :not(caption) > * > * {
    padding: 0.75rem;
    border-bottom-width: 1px;
    background-color: transparent
}
.table > .tableBody,
  .table > tbody {
    vertical-align: inherit
}
.table > .tableHead,
  .table > thead {
    vertical-align: bottom
}
.table > :not(:last-child) > :last-child > * {
    border-bottom-color: inherit
}
.tableCaptionTop {
    caption-side: top
}
.tableBorder > :not(.tableCaption) > *,
  .tableBorder > :not(caption) > * {
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-right-width: 0px;
    border-left-width: 0px
}
.tableBorder > :not(.tableCaption) > * > *,
  .tableBorder > :not(caption) > * > * {
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 1px;
    border-left-width: 1px
}
.tableBorderless > :not(.tableCaption) > * > *,
  .tableBorderless > :not(caption) > * > * {
    border-bottom-width: 0px
}
.tableStripe > .tableBody > .tableRow:nth-of-type(odd),
  .tableStripe > tbody > tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05)
}
.tableActive {
    background-color: rgba(0, 0, 0, 0.1)
}
.tableHover > .tableBody > .tableRow:hover,
  .tableHover > tbody > tr:hover {
    background-color: rgba(0, 0, 0, 0.075)
}
.tableResponsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch
}
@media (min-width: 0px) {
    .xs\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 576px) {
    .sm\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 768px) {
    .md\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 1024px) {
    .lg\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 1366px) {
    .xl\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 1536px) {
    .2xl\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 1920px) {
    .3xl\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 2560px) {
    .4xl\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 3840px) {
    .5xl\\.tableResponsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch
    }
}
@media (min-width: 576px) {
    .sm\\.table > :not(.tableCaption) > * > *,
    .sm\\.table > :not(caption) > * > * {
      padding: 0.25rem 0.25rem
    }
}`,
    options: {}
  })
})

