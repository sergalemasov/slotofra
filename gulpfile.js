const {src, dest, parallel, watch, series} = require('gulp');
const less = require('gulp-less');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');
const gulpif = require('gulp-if');

let isProd = false;

function htmlTask() {
    return src('src/html/index.pug')
        .pipe(pug())
        .pipe(dest('dist'));
}

function cssTask() {
    return src('src/styles/style.less')
        .pipe(less())
        .pipe(gulpif(() => isProd, minifyCSS()))
        .pipe(dest('dist/css'));
}

function imgTask() {
    return src('src/img/*')
        .pipe(gulpif(() => isProd, imagemin()))
        .pipe(dest('dist/img'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('src/img/*', imgTask);
    watch('src/styles/**/*.less', cssTask);
    watch('src/html/**/*.pug', htmlTask);

    watch("dist/**/*")
        .on('change', browserSync.reload);
}

function clean(cb) {
    rimraf('./dist', cb);
}

function enableProd(cb) {
    isProd = true;
    cb();
}

module.exports = {
    serve: series(clean, parallel(htmlTask, cssTask, imgTask), serve),
    default: series(enableProd, clean, parallel(htmlTask, cssTask, imgTask))
};
