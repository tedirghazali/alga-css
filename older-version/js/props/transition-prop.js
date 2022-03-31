const prop = require('./property.js')

module.exports = {
  property: {...prop, all: 'all'},
  duration: ['s', 'ms'],
  delay: ['s', 'ms'],
  effect: { //timingFunction
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
    stepStart: 'step-start',
    stepEnd: 'step-end'
  },
  steps: {
    jumpStart: 'jump-start',
    jumpEnd: 'jump-end',
    jumpNone: 'jump-none',
    jumpBoth: 'jump-both',
    start: 'start',
    end: 'end'
  }
}
