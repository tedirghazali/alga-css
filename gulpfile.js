const { src, dest, watch, series, parallel } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const postcss = require('gulp-postcss')
const path = require('path')

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
      require('postcss-custom-properties'),
      require('postcss-nested'),
      require('autoprefixer'),
      require('postcss-header')({ header })
    ]))
    .pipe(rename("alga-v1.css"))
    .pipe(dest('./dist/', { sourcemaps: '.' }))
}

function cssMin() {
  return src('dist/alga-v1.css')
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist/'))
}

function watchChanges() {
  watch('css/app.css', series(css, cssMin))
}

exports.watch = watchChanges
exports.build = series(css, cssMin)
exports.default = series(css, cssMin) //watchChanges
