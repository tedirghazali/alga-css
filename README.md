<p align="center">
  <a href="https://tedirghazali.gitbook.io" target="_blank" rel="noopener noreferrer">
    <img width="180" src="alga-css-logo.png" alt="Alga CSS logo">
  </a>
</p>
<br/>

# Alga CSS (formerly tailstrap)
Alga CSS is an alternative toolkit based on Tailwind CSS and Bootstrap 5 classes. This is not a framework but just CSS for my Vue components

No doubt about the current class names are very confusing because we write the value first and before the colon. So, now we provide a new way to create perfect css names by using dot/period (.) for breakpoint and colon (:) for value.

```html
<!-- current class name -->
<div class="smaller(start:flex)"></div>

<!-- new class name -->
<div class="xs.flexStart"></div>

<!-- future class name -->
<div class="smaller{flexStart;flexColumn;itemsCenter}"></div>
<div class="xs{flexStart;flexColumn;itemsCenter}"></div>

<!-- right now only support single class name -->
<div class="smaller{flexStart}"></div>

<!-- my expectation of class name in the future -->
<div class="smaller{[bg,txt].hex(#168243);bd.rgb(22,130,67);[m,p].value(1rem)}"></div>
<style>
.smaller\{\[bg\,txt\]\.hex\(\#168243\)\;bd\.rgb\(22\,130\,67\)\;\[m\,p\]\.value\(1rem\)\} {
  background-color: #168243;
  color: #168243;
  border-color: rgb(22, 130, 67);
  margin: 1rem;
  padding: 1rem;
}
</style>
```
