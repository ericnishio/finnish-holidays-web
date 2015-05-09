var gulp = require('gulp');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('default', ['build', 'connect']);

gulp.watch('./src/**/*', ['build']);

gulp.task('build', function() {
  gulp.src('./src/**/*').pipe(gulp.dest('./dist'));

  gulp.src('./src/sass/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'));

  return browserify('./src/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function(done) {
  gulp.src('./src/app/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.dist + '/css/'))
    .on('end', done);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    hostname: 'localhost',
    port: 1337,
    middleware: function() {
      return [
        modRewrite(['!\\.html|assets|vendor|images|\\.js|\\.css|\\swf$ /index.html [L]'])
      ];
    }
  });
});
