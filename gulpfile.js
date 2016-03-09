var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('default', ['compile-sass', 'watch', 'browser-sync']);

gulp.task('watch', function(){
    gulp.watch('styles/**/*.scss', ['compile-sass']);
});

gulp.task('compile-sass', function(){
    gulp.src('styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function(){
    browserSync.init({
        proxy: "http://local.projet-video.com/"
    });

    gulp.watch("styles/**/*.scss", ['compile-sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/**/*.js").on('change', browserSync.reload);
});