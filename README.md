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

What I mean by scope-first is, this Alga CSS is specially made for frameworks or libraries that support scoped-css like `Vue`, `Svelte` and `Astro`. Also, my goal in building this is to support all the UI libraries that I have now like `vidie` or `sastra`

All the main features:
1. Created for scoped CSS
2. As a PostCSS plugin
3. Composing or mixing CSS components
4. Provide/inject a large CSS component
5. Custom CSS utility/helper (preset, define, color, screen, etc.)
6. Extract classes from HTML (Petite-Vue, Alpine.js), Astro, Vue, Svelte, and JSX as well

## Utility and Mixin
For getting CSS utility, I provide a custom property which is `ref`.

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

For mixing or composing CSS properties, we can use `props` custom property.

```css
@set className {
  ref: flex justifyCenter flex-20 bgPrimary-3;
}

.otherClassName {
  props: className;
}
```

## Composable CSS Component (@set, @get)

## Advanced CSS Component (@provide, @inject, @prefers, @screen)

