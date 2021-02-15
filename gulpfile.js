// 定数の設定
const {src, dest, watch, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// パスの設定
const paths = {
    root: 'src/',
    sass: 'src/assets/styles/**/*.scss',
    css: 'dist/assets/styles/',
    pug: 'src/**/*.pug',
    html: 'dist/',
}

// pug
const html = (done) => {
    return src(paths.pug)
        .pipe(
        plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
        )
        .pipe(
            pug({
                basedir: paths.root,
                pretty: true,
            })
        )
        .pipe(dest(paths.html));
    done();
}

// sass
const css = (done) => {
    return src(paths.sass)
      .pipe(
        plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
      )
      .pipe(sass())
      .pipe(dest(paths.css));
    done();
}

exports.default = () => {
    watch(paths.pug, html);
    watch(paths.sass, css);
}
exports.build = parallel(html, css);