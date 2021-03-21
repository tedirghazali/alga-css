const { src, dest, watch, series, parallel } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const postcss = require('gulp-postcss')
const path = require('path')

const dist = {
  css: './dist/',
  js: './dist/',
}

const header = `@charset "UTF-8";

/*!
 * Alga CSS
 * Tedir Ghazali
 * licensed under Tedir license
 */
`;

function css() {
  return src('css/app.css', { sourcemaps: true })
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-mixins')({
        mixinsDir: path.join(__dirname, 'css/mixins')
      }),
      require('tailwindcss'),
      //require("stylelint"),
      require('postcss-custom-properties'),
      //require('postcss-simple-vars'),
      require('postcss-nested'),
      require('autoprefixer'),
      require('postcss-header')({ header })
    ]))
    .pipe(rename("alga.css"))
    .pipe(dest(dist.css, { sourcemaps: '.' }))
}

function cssMin() {
  return src(`${dist.css}alga.css`)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(dist.css))
}

function cssSlim() {
  return src('css/slim.css', { sourcemaps: true })
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-mixins')({
        mixinsDir: path.join(__dirname, 'css/mixins')
      }),
      require('tailwindcss'),
      //require("stylelint"),
      require('postcss-custom-properties'),
      //require('postcss-simple-vars'),
      require('postcss-nested'),
      require('autoprefixer'),
      require('postcss-header')({ header })
    ]))
    .pipe(rename("alga-slim.css"))
    .pipe(dest(dist.css, { sourcemaps: '.' }))
}

function cssSlimMin() {
  return src(`${dist.css}alga-slim.css`)
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(dist.css))
}

function watchChanges() {
  watch('css/app.css', series(css, cssMin))
  watch('css/slim.css', series(cssSlim, cssSlimMin))
}

exports.watch = watchChanges
exports.build = series(css, cssMin, cssSlim, cssSlimMin)
exports.default = series(css, cssMin, cssSlim, cssSlimMin) //watchChanges
