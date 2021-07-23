const postcss = require('postcss')
const algacss = require('../js/')

async function run (input, output, opts = { }) {
  let result = await postcss([
    algacss(opts)
  ]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

test('does something', async () => {
  await run('a{ }', 'a{ }', { })
})

test('test injection', async () => {
  let result = await postcss([
    algacss({
      provide: ['./test/provide/*.css'],
      extract: ['./test/extract/*.html']
    })
  ]).process('@inject dot;', { from: undefined })
  console.log(result.css)
})

/*test('test provide', async () => {
  let result = await postcss([
    algacss({})
  ]).process(`
@provide btn {
  .btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: var(--txtButton, #212529);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: var(--bgButton, transparent);
    border: 1px solid var(--bdButton, transparent);
    border-radius: var(--rdButton, 0.25rem);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  @prefers reduce {
    .btn {
      transition: none;
    }
  }

  .btn:hover {
    color: #000;
    background-color: rgba(0, 0, 0, 0.075);
  }

  .btn.active {
    color: #000;
    background-color: rgba(0, 0, 0, 0.125);
  }

  @prefers dark {
    [data-dark='true'] .btn {
      color: #fff;
    }
    
    [data-dark='true'] .btn:hover {
      color: #fff;
    }
    
    [data-dark='true'] .btn.active {
      color: #fff;
    }
  }

  [data-mode='dark'] .btn {
    color: #fff;
  }

  [data-mode='dark'] .btn:hover {
    color: #fff;
  }

  [data-mode='dark'] .btn.active {
    color: #fff;
  }
}

@inject btn;
@inject toolbar;
  `, { from: undefined })
  console.log(result.css)
})*/
