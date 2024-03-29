const execute = require('../execute.js')

test('Testing sideBar component', async () => {
  const input = '@use sideBar;'
  const output = `.sideBar {
    position: relative;
    z-index: 3;
    width: 240px;
    min-height: 100vh;
    height: 100%;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: transparent;
    box-shadow: none
}
.sideBar .sideWrap {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 100%;
    min-height: 100vh;
    padding-right: 1rem;
    padding-left: 1rem
}
.sideBar .sideWrap .sideMain {
    flex-grow: 1
}
.sideNav {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%
}
.sideNav .navBrand {
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
.sideAvatar {
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
    text-align: center
}
.sideAvatar .avatarImage {
    width: 84px;
    height: 84px;
    border-radius: 5px
}
.sideAvatar .avatarTitle {
    margin-top: 0.5rem;
    margin-bottom: 0px;
    color: #4c4c4c;
    font-size: 1rem
}
.sideAvatar .avatarDescription {
    margin-top: 0.15rem;
    margin-bottom: 0px;
    color: #2d2d2d;
    font-size: 0.75rem
}
.sideTitle {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 1rem;
    color: inherit;
    opacity: 0.5
}
.sideMenu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap
}
.sideMenu > .sideItem {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}
.sideNav > .navItem, .sideNav > .navToggler {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}
.sideNav > .navToggler {
    appearance: none;
    border: 0;
    background-color: transparent
}
.sideNav > .navToggler > svg, .sideNav > .navToggler > i {
    pointer-events: none;
    display: block
}
.sideMenu > .navItem:first-child, .sideNav > .navBrand:first-child, .sideNav > .navToggler:first-child {
    padding-left: 0
}
.sideMenu > .navItem:last-child, .sideNav > .navToggler:last-child {
    padding-right: 0
}
@media (max-width: 599px) {
    .sideBar {
        display: none
    }
}`
  await execute(input, output, {log: false, file: './examples/sideBar/sideBar.css'})
})
