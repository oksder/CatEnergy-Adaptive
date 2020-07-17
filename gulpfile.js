'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
  gulp.watch('scss/style.scss', gulp.series('sass'));
});

var posthtml = require('gulp-posthtml');
var include = require('posthtml-include')

gulp.task('html', () => {
  return gulp.src('*.html')
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('dist'))
})
