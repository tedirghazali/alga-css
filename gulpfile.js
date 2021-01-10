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
      require('postcss-simple-vars'),
      require('postcss-nested'),
      require('autoprefixer')
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

/*function js() {
  return src('./js/alga.js')
    .pipe(dest(dist.js))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(dist.js))
}*/

function watchChanges() {
  watch('css/app.css', series(css, cssMin))
  //watch('js/alga.js', js)
}

exports.watch = watchChanges
exports.build = series(css, cssMin) //, js
exports.default = series(css, cssMin) //, js, watchChanges
