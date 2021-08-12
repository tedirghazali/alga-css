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
Alga CSS is a scope-first CSS toolkit for quickly compose or share any design between components

What I mean by scope-first is, this Alga CSS is specially made for frameworks or libraries that support scoped-css like `Vue` (`Svelte` or `Astro` in the future). Also, my goal in building this is to support all the UI libraries that I have now like `vidie` (`sastra` in progress)

All the main features:
1. Created for scoped CSS
2. As a PostCSS plugin
3. Composing or mixing CSS components
4. Provide/inject a large CSS component
5. Custom CSS utility/helper (preset, define, color, screen, etc.)
6. Extract classes from HTML (Petite-Vue, Alpine.js) and Vue (in the future will support Svelte, Astro, and JSX as well)

## Class Name Structure
Alga CSS allow you to use whatever special character you wish (use either `-`, `.`, `:` or `_`) as divider or separator of class names or references.

```css
/* highly recommended */
<span class="md.mgTop-5 bgPrimary-725 txtColor-hex(333)"></span>

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
For composing CSS utility, I provide a custom property which is `ref`.

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

For mixing CSS properties, we can use `props` custom property.

```css
@set className {
  ref: flex justifyCenter flex-20 bgPrimary-3;
}

.otherClassName {
  props: className;
}
```

For getting CSS custom class, we can use `@get` custom rule and `emit` custom property if you want to inject CSS utility to it.

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

