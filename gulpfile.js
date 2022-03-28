const { src, dest, series, parallel, watch } = require('gulp');
const html_extend = require('gulp-html-extend');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

// BrowserSync

function browserServe(done) {
   browserSync.init({
      server: 'dist',
      injectChanges: true,
      port: 1234
   })
   done();
}

function reloadBrowser(done) {
   browserSync.reload();
   done();
}

// Tasks
function html() {
   return src('src/*.html')
      .pipe(html_extend())
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
}

function css() {
   return src('src/main.css')
      .pipe(postcss())
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
}

// Watch
function watchTask() {
   watch('src/**/*.{html,css}', series(html, css));
}

exports.dev = series(browserServe, watchTask);
exports.default = parallel(html, css);