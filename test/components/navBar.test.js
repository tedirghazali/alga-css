const execute = require('../execute.js')

test('Testing navBar component', async () => {
  const input = '@use navBar;'
  const output = `.navBar {
    position: relative;
    z-index: 3;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem
}
.navBar .navWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.75rem;
    padding-left: 0.75rem
}
.navBar .navWrap .navStart {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    width: 100per
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
    margin-right: auto;
    cursor: pointer
}
.navBar .navWrap .navStart .navBrand:first-child {
    padding-left: 0
}
.navBar .navWrap .navStart .navToggler {
    padding: 0.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    margin: 10px;
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
    display: none
}
.navBar .navWrap .navEnd .navMenu {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center
}
.navBar .navWrap .navEnd .navMenu .navItem {
    padding: 0.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    margin: 10px
}
.navBar .navWrap .navEnd .navMenu .navItem:first-child {
    padding-left: 0
}
.navBar .navWrap .navEnd .navMenu .navItem:last-child {
    padding-right: 0
}
@media (max-width: 599px) {
    .navBar .navWrap .navStart {
        width: auto
    }
    .navBar .navWrap .navStart .navToggler.navMobile {
        display: none
    }
    .navBar .navWrap .navEnd {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;
        flex-grow: 1;
        padding-left: 0.75rem
    }
}`
  await execute(input, output, {log: false, file: './examples/navBar/navBar.css'})
})
