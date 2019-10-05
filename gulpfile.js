const {src, dest, parallel, watch} = require('gulp');
const less = require('gulp-less');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function htmlTask() {
    return src('src/html/index.pug')
        .pipe(pug())
        .pipe(dest('dist'));
}

function cssTask() {
    return src('src/styles/style.less')
        .pipe(less())
        .pipe(dest('dist/css'));
}

function imgTask() {
    return src('src/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

function serve() {
    parallel(htmlTask, cssTask, imgTask)();

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

module.exports = {
    serve,
    default: parallel(htmlTask, cssTask, imgTask)
};
