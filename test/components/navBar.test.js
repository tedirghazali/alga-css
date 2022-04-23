const execute = require('../execute.js')

test('Testing navBar component', async () => {
  const input = '@use navBar;'
  const output = `.navBar {
    position: relative;
    z-index: 4;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: transparent;
    box-shadow: none
}
.navBar .navWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding-right: 1.5rem;
    padding-left: 1.5rem
}
.navBar .navWrap .navStart {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    max-width: 240px
}
.navBar .navWrap .navStart .navBrand {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    font-size: 1.25rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    flex-grow: 1;
    cursor: pointer
}
.navBar .navWrap .navStart .navBrand:first-child {
    padding-left: 0
}
.navBar .navWrap .navStart .navToggler {
    padding: 0.75rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    appearance: none;
    border: 0;
    background-color: transparent
}
.navBar .navWrap .navStart .navToggler svg, .navBar .navWrap .navStart .navToggler i {
    pointer-events: none;
    display: block
}
.navBar .navWrap .navStart .navToggler:first-child {
    padding-left: 0
}
.navBar .navWrap .navStart .navToggler:last-child {
    padding-right: 0
}
.navBar .navWrap .navStart .navToggler.navMobile {}
.navBar .navWrap .navEnd {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    flex-grow: 1;
    padding-left: 0.75rem
}
.navBar .navWrap .navEnd .navMenu {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center
}
.navBar .navWrap .navEnd .navMenu .navItem {
    padding: 0.75rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer
}
.navBar .navWrap .navEnd .navMenu .navItem:first-child {
    padding-left: 0
}
.navBar .navWrap .navEnd .navMenu .navItem:last-child {
    padding-right: 0
}
@media (max-width: 599px) {
    .navBar .navWrap .navStart {
        width: 100%;
        max-width: 100%
    }
    .navBar .navWrap .navEnd {
        display: none
    }
    .navBar .navWrap .navEnd .navMenu {
        display: none
    }
}
@media (min-width: 600px) {
    .navBar .navWrap .navStart .navToggler.navMobile {
        display: none
    }
}`
  await execute(input, output, {log: false, file: './examples/navBar/navBar.css'})
})
