const postcss = require('postcss')
const algacss = require('../src/')

async function execute(arg = { input: 'a {}', output: 'a {}', options: {} }) {
  let result = await postcss([
    algacss(arg.options)
  ]).process(arg.input, { from: undefined })
  expect(result.css).toEqual(arg.output)
  expect(result.warnings()).toHaveLength(0)
}

test('Reading component atRule', async () => {
  //await execute()
  let result = await postcss([
    algacss()
  ]).process(`
@define props {
  size: 0.75rem;
}

@alga navBar {
  .navBar {
    ref: position-relative zIndex-3 paddingTop-{size} paddingBottom-{size};
    
    .navWrap {
      ref: display-flex flexDirection-row flexWrap-nowrap alignItems-center justifyContent-spaceBetween paddingRight-{size} paddingLeft-{size};
      
      .navStart {
        ref: display-flex justifyContent-flexStart flexWrap-nowrap alignItems-center width-100per;
        
        .navBrand {
          ref: paddingTop-0.375rem paddingBottom: 0.375rem paddingRight-0.75rem paddingLeft-0.75rem fontSize-1.25rem textDecoration-none color-inherit whiteSpace-nowrap marginRight-auto cursor-pointer;
        }
      }
      
      .navEnd {
        ref: display-none;
      }
    }
  }
  
  .navBar > .navWrap > .navEnd > .navMenu {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
  }
      
  .navBar > .navWrap > .navEnd > .navMenu > .navItem,
  .navBar > .navWrap > .navStart > .navToggler {
    padding: 0.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    cursor: pointer;
  }
      
  .navBar > .navWrap > .navStart > .navToggler {
    appearance: none;
    border: 0;
    background-color: transparent;
  }
      
  .navBar > .navWrap > .navStart > .navToggler > svg,
  .navBar > .navWrap > .navStart > .navToggler > i {
    pointer-events: none;
    display: block;
  }
      
  .navBar > .navWrap > .navEnd > .navMenu > .navItem:first-child,
  .navBar > .navWrap > .navStart > .navBrand:first-child,
  .navBar > .navWrap > .navStart > .navToggler:first-child {
    padding-left: 0;
  }
      
  .navBar > .navWrap > .navEnd > .navMenu > .navItem:last-child,
  .navBar > .navWrap > .navStart > .navToggler:last-child {
    padding-right: 0;
  }
      
  @media (min-width: 640px) {
    .navBar > .navWrap > .navStart {
      width: auto;
    }
        
    .navBar > .navWrap > .navEnd {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: center;
      flex-grow: 1;
      padding-left: 0.75rem;
    }
        
    .navBar > .navWrap > .navStart > .navToggler.navMobile {
      display: none;
    }
  }
}

@use navBar {
  size: 0.75rem;
}
  `, { from: undefined })
  console.log(result.css)
})
