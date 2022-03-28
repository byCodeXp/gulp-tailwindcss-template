const { src, dest, parallel, watch } = require('gulp');

const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const gulpHtmlExtend = require('gulp-html-extend');

function styles() {
   return src('src/main.css')
      .pipe(postcss())
      .pipe(dest('dist'));
}

function views() {
   return src('src/*.html')
      .pipe(gulpHtmlExtend())
      .pipe(dest('dist'));
}

exports.default = parallel(styles, views);

exports.watch = function () {
   watch('src/**/*.html', views);
   watch('src/**/*.{html,css}', styles);
}