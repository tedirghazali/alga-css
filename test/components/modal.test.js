const execute = require('../execute.js')

test('Testing modal dialog component', async () => {
  const input = '@use modal;'
  const output = `.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh
}
.modalBackdrop {
    position: fixed;
    z-index: 5;
    inset: 0 3em 3em 0;
    width: 100vw;
    height: 100vh;
    display: none
}
.modal.active .modalBackdrop {
    display: block;
    background-color: rgba(0,0,0,0.5)
}
.modalDialog {
    position: relative;
    z-index: 6;
    padding: 1.5rem;
    display: none
}
.modal.active .modalDialog {
    display: block
}
.modal.active .modalDialog.modalCenter {
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh
}
.modalContent {
    background-color: #fff;
    border: 1px solid #d9d9d9;
    margin-right: auto;
    margin-left: auto;
    border-radius: 0.375rem
}
.modalFullscreen {
    padding: 0
}
.modalFullscreen .modalContent {
    width: 100vw;
    height: 100vh;
    border-radius: 0
}
.modalHeader, .modalFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem
}
.modalHeader {
    border-bottom: 1px solid #d9d9d9
}
.modalHeader .modalTitle {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem
}
.modalBody {
    padding: 0.75rem 1rem
}
.modalFooter {
    border-top: 1px solid #d9d9d9
}
@media (max-width: 599px) {
    .modalContent {
        width: 100%;
        margin-right: 0.25rem;
        margin-left: 0.25rem
    }
}
@media (min-width: 600px) {
    .modalContent {
        width: 500px
    }
}`
  await execute(input, output, {log: false, file: './examples/modal/modal.css'})
})
