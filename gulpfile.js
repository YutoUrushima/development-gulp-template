// 定数の設定
const {src, dest, watch, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

// パスの設定
const paths = {
    root: 'src/',
    dist: 'dist/',
    sass: 'src/assets/styles/**/*.scss',
    css: 'dist/assets/styles/',
    pug: 'src/**/*.pug',
    html: 'dist/',
}

// pug
const Pug = (done) => {
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
const Sass = (done) => {
    return src(paths.sass)
      .pipe(
        plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
      )
      .pipe(sass())
      .pipe(dest(paths.css));
    done();
}

// browserSync
const BrowserSync = (done) => {
    return browserSync.init({
        server: {
            baseDir: paths.dist
        },
        reloadOnRestart: true
    });
}

// browserSync reload
const Reload = (done) => {
    browserSync.reload();
    done();
};

// npx gulpでの操作
exports.default = () => {
    watch(paths.pug, series(Pug, Reload));
    watch(paths.sass, series(Sass, Reload));
    BrowserSync();
}
exports.build = parallel(Pug, Sass);