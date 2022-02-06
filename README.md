<p align="center">
  <a href="https://algacss.gitlab.io/docs/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="alga-css-logo.png" alt="Alga CSS logo">
  </a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/alga-css?minimal=true"><img src="https://img.shields.io/npm/dm/alga-css.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/alga-css"><img src="https://img.shields.io/npm/v/alga-css.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/alga-css"><img src="https://img.shields.io/npm/l/alga-css.svg?sanitize=true" alt="License"></a>
</p>
<br/>

# Alga CSS
Alga CSS is a scope or component-first CSS toolkit for quickly mix or compose the CSS components and properties

I rewrite the entire api again, this time I will focus on provide a component for CSS instead

All the main features:
1. Created for scoped CSS
2. As a PostCSS plugin
3. Composing or mixing CSS components
5. Custom CSS helpers (preset, define, color, screen, etc.)
6. Extract classes from HTML (Petite-Vue, Alpine.js), Vue, Svelte, and Astro

## Installation and Setup
Alga CSS built on top of PostCSS, so before installing Alga CSS, you need to have PostCSS first and after that you can use NPM or Yarn to install this Alga CSS.

```sh
npm install alga-css@next

#or

yarn add alga-css@next
```

If you use tool that support PostCSS out of the box like Vite for instance, you just need to create a new config file which is `postcss.config.js` and add the code below to that file.

```js
const algacss = require('alga-css')

module.exports = {
  plugins: [
    algacss({
      extract: ['./src/**/*.vue', './src/**/*.html', './src/**/*.svelte', './src/**/*.astro']
    })
  ]
}
```

## Class Name Structure
Alga CSS allow you to use whatever special character you wish (use either `-`, `|`, `:` or `_`) as divider or separator of class names or references.

```css
/* highly recommended */
<span class="marginTop-0.75rem padding-10px md:marginTop-5per color-rgb(205,45,67) backgroundColor-hex(fff)"></span>

.className {
  ref: marginTop-0.75rem padding-10px color-rgb(205,45,67) backgroundColor-hex(fff);
  md: marginTop-5per;
}

/* class structure: property (camelCase for name and value separated by - or dash) */
justifyContent-spaceBetween

/* class structure: unit size (per is unit size in percent) */
width-100per

/* class structure: screen */
md:paddingLeft-3px

/* class structure: mode */
dark:backgroundColor-hex(333)

/* class structure: state */
facus:paddingLeft-3px
```

## CSS Component
We provide alga format `.alga` for creating CSS component.

```css
/* navBar.alga */

@define props {
  size: 0.75rem;
}

@alga navBar {
  .navBar {
    ref: position-relative zIndex-3;
    props-paddingTop: size;
    props-paddingBottom: size;
  }
}

@use {
  size: 20px;
}
```

## Mixin and Composing CSS Component
to compose the CSS component.

```css
/* layout.alga */

@import 'navBar.alga'

@alga layout {
  use: navBar;
}

@use layout;
```

