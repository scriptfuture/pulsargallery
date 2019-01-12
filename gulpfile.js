var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve({
  root: ['source'],
  port: 5000
}));

gulp.task('default', ['serve']);