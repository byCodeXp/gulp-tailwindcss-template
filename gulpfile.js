const {src, dest, series, parallel, watch} = require('gulp');
const html_extend = require('gulp-html-extend');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass')(require('sass'));

// BrowserSync

function browserServe(done) {
    browserSync.init({
        server: 'dist',
        open: false,
        injectChanges: true,
        port: 1234
    })
    done();
}

// Tasks
function html() {
    return src('src/documents/*.html')
        .pipe(html_extend())
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function css() {
    return src('src/main.scss')
        .pipe(postcss())
        .pipe(sass())
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

function images() {
    return src('src/assets/pictures/*.{png,jpg}')
        .pipe(dest('dist/resources'));
}

function fonts() {
    return src('src/assets/fonts/**/*.ttf')
        .pipe(dest('dist/fonts'));
}

// Watch
function watchTask() {
    watch('src/documents/**/*.{html,css}', parallel(html, css));
    watch('src/assets/fonts/**/*.ttf', fonts);
    watch('src/assets/pictures/*.{png,jpg}', images);
}

exports.dev = series(browserServe, watchTask);
exports.default = parallel(html, css, images, fonts);