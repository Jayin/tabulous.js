var gulp = require('gulp')
var minifyCss = require('gulp-minify-css')
var uglify = require('gulp-uglify')

gulp.task('minify-css', function() {
  return gulp.src('src/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'))
})


gulp.task('compress', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['compress', 'minify-css'], function(){
    gulp.watch(['./src/**/*'], ['compress', 'minify-css'])
})


gulp.task('default', ['watch'])