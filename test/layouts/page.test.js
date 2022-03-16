const execute = require('../execute.js')

test('Testing page component', async () => {
  const input = `@use page {
    layout: bottomLeft;
  }`
  const output = `.page {
    display: grid;
    max-width: 100vw;
    width: 100%;
    grid-template: [left-section-left] "left-section main-section" 1fr [main-section-right]
                    [bottom-section-left] "bottom-section bottom-section" auto [bottom-section-right]
                    / auto 1fr
}
.page .pageSectionTop {
    grid-area: top-section
}
.page .pageSectionLeft {
    grid-area: left-section
}
.page .pageSectionMain {
    grid-area: main-section
}
.page .pageSectionRight {
    grid-area: right-section
}
.page .pageSectionBottom {
    grid-area: bottom-section
}`
  await execute(input, output, {log: false, file: './examples/layoutPage/page.css'})
})
