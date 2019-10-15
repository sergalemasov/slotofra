const {src, dest, parallel, watch, series} = require('gulp');
const {join} = require('path');
const less = require('gulp-less');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const jsOrder = require('./src/scripts/order.js');

let isProd = false;

function htmlTask() {
    return src(['index.pug', 'privacy-policy.pug'].map(s => join('src/html', s)))
        .pipe(pug())
        .pipe(rename(path => path.dirname = ''))
        .pipe(dest('dist'));
}

function cssTask() {
    return src(['index.less', 'privacy-policy.less'].map(s => join('src/styles', s)))
        .pipe(less())
        .pipe(gulpif(() => isProd, minifyCSS()))
        .pipe(rename(path => path.dirname = ''))
        .pipe(dest('dist/css'));
}

function imgTask() {
    return src('src/img/*')
        .pipe(gulpif(() => isProd, imagemin()))
        .pipe(dest('dist/img'));
}

function jsTask() {
    return src(jsOrder.map(s => join('src/scripts', s)))
        .pipe(concat('index.js'))
        .pipe(gulpif(() => isProd, uglify()))
        .pipe(dest('dist/js'));
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
    watch('src/scripts/**/*.js', jsTask)

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
    serve: series(clean, parallel(htmlTask, cssTask, imgTask, jsTask), serve),
    default: series(enableProd, clean, parallel(htmlTask, cssTask, imgTask, jsTask))
};
