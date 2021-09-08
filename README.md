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
Alga CSS is a scope-first CSS toolkit for quickly mix or compose the CSS references and share the CSS properties between components

What I mean by scope-first is, this Alga CSS is specially made for frameworks or libraries that support scoped-css like `Vue`, `Svelte` or `Astro`. Also, my goal in building this is to support all the UI libraries that I have now like `vidie` or `sastra`.

All the main features:
1. Created for scoped CSS
2. As a PostCSS plugin
3. Composing or mixing CSS components
4. Provide/inject a large CSS component
5. Custom CSS utility/helper (preset, define, color, screen, etc.)
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
      extract: ['./src/**/*.vue', './src/**/*.svelte', './src/**/*.html']
    })
  ]
}
```

## Class Name Structure
Alga CSS allow you to use whatever special character you wish (use either `-`, `.`, `:` or `_`) as divider or separator of class names or references.

```css
/* highly recommended */
<span class="md.mgTop-5 bgPrimary-725 txtColor.hex(333)"></span>

.className {
  ref: md.mgTop-5;
  ref: txtColor.rgb(205,45,67);
}


/* alternative */
md.pdTop.2

md-pdBottom-4

md:pdLeft:3

md_pdRight_7
```

## Mixin and Composing CSS Component
to compose the CSS reference, we provide a custom property which is `ref` to apply css property to our class.

```css
.className {
  ref: flex justifyCenter flex-20 bgPrimary-3;
}

.otherClassName {
  ref: flex;
  ref: justifyCenter;
  ref: flex-20;
  ref: bgPrimary-3;
}
```

to mix the CSS properties, we provide `props` custom property, this only allow to get CSS properties from `@set` custom atRule.

```css
@set className {
  ref: flex justifyCenter flex-20 bgPrimary-3;
}

.otherClassName {
  props: className;
}
```

to get the CSS custom class (`@get`), you can use `@get` custom rule and `emit` custom property if you want to inject CSS reference to it.

```css
@get className;

/* or */

@get className {
  emit: txtBold-5 bdSolid-5;
}

/* or */

@get className {
  emit: txtBold-5;
  emit: bdSolid-5;
}
```

## Fragmenting CSS Component
Alga CSS also provide a custom atRule for just solving that problem, to create a CSS component, you can use `@provide` and if you want to insert that component to your actual CSS file or scope CSS (like using Vue SFC `<style scoped>`).

```css
/* Create a component */
@provide componentName {
  
  @get className;
  
  .otherClassName {
    ref: flexBetween;
  }
  
  @slot slotName;
}

/* Insert the component */
@inject componentName;

/* In the future */
@inject componentName {
  slot: className otherClassName;
  slotName: anotherClassName;
}
```

## Area or Layout Component
You might want to create a complex layout that based on `grid-template` using Alga CSS, like for instance, creating page layout with multiple sections, you can do that by just using our custom atRule `@area`.

```css
/* Input: */
@area layoutName {
  areas: "a b c" "a b c" "a b c";
  x: auto 1fr auto;
  y: auto 1fr auto;
  layoutSectionA: areaA;
  layoutSectionB: areaB;
  layoutSectionC: areaC;
}

/* Output: */
.layoutName {
  display: grid;
  grid-template-areas: "a b c" "a b c" "a b c";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
}
.layoutSectionA {
  grid-area: a;
}
.layoutSectionB {
  grid-area: b;
}
.layoutSectionC {
  grid-area: c;
}
```
