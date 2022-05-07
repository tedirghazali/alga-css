const execute = require('../execute.js')

test('Testing tags, tag input, and badge component', async () => {
  const input = '@use tags;'
  const output = `.tag {
    display: inline-flex;
    align-items: center;
    border-radius: 0.375rem;
    text-decoration: none;
    cursor: pointer;
    background-color: #283541;
    color: #fff;
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: bold;
    padding: 3px 10px;
    border: 1px solid #192229
}
.tag.groupItem:first-child {
    cursor: default
}
.tag.groupItem:last-child {
    padding-right: 5px;
    padding-left: 5px
}
.tag.groupItem svg {
    pointer-events: none
}
.tags {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 0.5rem
}
.taggable {
    width: auto
}
.tagContent {
    display: block;
    position: relative;
    z-index: 6
}
.tagBackdrop {
    position: fixed;
    z-index: 5;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.taggable.active .tagBackdrop {
    display: block
}
.input.tagToggler {
    padding: 0.5rem;
    display: flex;
    justify-content: start
}
.tagInput {
    background-color: transparent;
    border-color: transparent;
    width: 100px;
    outline: 0
}
.tagList {
    position: absolute;
    z-index: 7;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    width: 100%;
    border-radius: 0.375rem;
    overflow-y: auto;
    display: none;
    border-top-width: 0px;
    max-height: calc(10 * 36px)
}
.tagList .tagOption {
    display: block;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    text-decoration: none;
    color: #283541
}
.tagList .tagOption:last-child {
    border-bottom: 0
}
.tagList .tagOption:hover {
    background-color: #ededed
}
.taggable.active .input.tagToggler {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
}
.taggable.active .tagList {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    display: block
}
.badge {
    display: inline;
    margin-top: 0px;
    margin-left: 0.15rem;
    padding: 3px 7.5px;
    border-radius: 0.375rem;
    text-decoration: none;
    background-color: #283541;
    color: #fff;
    font-size: 0.75rem;
    font-weight: bold
}
.badgeTop {
    margin-top: -0.375rem
}
.badgeRound {
    border-radius: 99px
}`
  await execute(input, output, {log: false, file: './examples/tags/tags.css'})
})
