var gulp = require('gulp');
var serve = require('gulp-serve');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var currentVersion =  '0.2';
 
gulp.task('serve', serve({
  root: ['./'],
  port: 5000
}));

gulp.task('build', function() {
    gulp.src('source/js/*.js')
        .pipe(concat('pulsargallery-' + currentVersion + '.js'))
        .pipe(uglify())
        .pipe(rename({
            basename: 'pulsargallery-' + currentVersion,
            suffix: '.min'
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('default', ['serve']);