var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();​

gulp.task('default', ['compile-sass', 'watch', 'browser-sync'])
​
gulp.task('watch', function(){
    gulp.watch('www/styles/**/*.scss', ['compile-sass']);
});

gulp.task('compile-sass', function(){
    gulp.src('www/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('www/styles'))
        .pipe(browserSync.stream());
});
​
gulp.task('browser-sync', function(){
    browserSync.init({
        proxy: "http://local.lafabrique.com/"
    })
​
    gulp.watch("www/styles/**/*.scss", ['compile-sass']);
    gulp.watch("www/*.html").on('change', browserSync.reload);
    gulp.watch("www/js/**/*.js").on('change', browserSync.reload);
});