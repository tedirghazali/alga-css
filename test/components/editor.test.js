const execute = require('../execute.js')

test('Testing rich text editor component', async () => {
  const input = `@use editor;`
  const output = `.editor {
    width: 100%;
    background-color: #fff;
    background-clip: border-box;
    word-wrap: break-word
}
.editor > *:first-child {
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem
}
.editor > *:last-child {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem
}
.editorToolbar {
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
    background-color: #fff
}
.editorStatusbar {
    border-top: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
    background-color: #fff
}
.editorContent {
    flex: 1 1 auto;
    padding: 1rem 0.75rem;
    outline: 0;
    display: block;
    position: relative
}
.editorMenu {
    display: flex;
    padding-left: 0;
    margin: 0;
    list-style: none;
    gap: 5px
}
.editorItem {
    display: block;
    padding: 0.25rem 0.25rem;
    border-radius: 0.25rem;
    color: #4a5568;
    text-decoration: none;
    cursor: default;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out
}
.editorItem.active {
    background-color: #e7eefa;
    border: 1px solid #b8e7fd
}
.editorText {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    box-shadow: 1px 1px 4px #d9d9d9;
    z-index: 5
}
.editorTooltip {
    position: relative;
    display: flex;
    flex-direction: column
}
.editorSection {
    border-top-left-radius: 0px
}
.editorSection .editorBlock {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    box-shadow: 1px 1px 4px #d9d9d9;
    z-index: 5;
    border-top-left-radius: 0px;
    margin-top: 47px
}
.editorSection .editorBlock .editorToolbar {
    position: absolute;
    top: -37px;
    left: -1px;
    border: 1px solid #d9d9d9;
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    z-index: 4
}
.editorBackdrop {
    position: fixed;
    z-index: 25;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.editorInline {
    position: relative;
    display: inline-block
}
.editorInline .editorToolbar {
    visibility: hidden;
    position: absolute;
    z-index: 30;
    bottom: -47px;
    left: 0px;
    display: inline-block;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem
}
.editorInline:hover .editorToolbar {
    visibility: visible
}
.editorInline .editorToolbar:after {
    content: "";
    position: absolute;
    z-index: 29;
    top: -16px;
    left: 20px;
    margin-left: -10px;
    border-width: 8px;
    border-style: solid;
    transform: rotate(180deg);
    border: #d9d9d9 transparent transparent transparent
}`
  await execute(input, output, {log: false, file: './examples/editor/editor.css'})
})
