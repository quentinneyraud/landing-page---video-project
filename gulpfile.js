var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var gutil = require('gutil');
var webpackstream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./",
            port: 8082
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('images', function () {
    gulp.src('images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('images/'));
});

gulp.task('styles', function () {
    gulp.src(['styles/**/*.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('styles/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('styles/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return webpack(webpackConfig, function (error, stats) {
        if (error) throw new gutil.PluginError('webpack', error);
        gutil.log('[webpack]', stats.toString());
    });
})

gulp.task('build', ['images', 'styles', 'scripts']);

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("styles/**/*.scss", ['styles']);
    gulp.watch("js/source/**/*.js", ['scripts']);
    gulp.watch("*.html", ['bs-reload']);
});