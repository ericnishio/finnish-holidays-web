require('dotenv').load();

var gulp = require('gulp');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var awsS3 = require('gulp-aws-s3');

gulp.task('default', ['optimize', 'connect']);

gulp.watch('./src/**/*', ['build']);

gulp.task('build', ['sass'], function() {
  gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
  gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'));

  return browserify('./src/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function(done) {
  gulp.src('./src/sass/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'))
    .on('end', done);
});

gulp.task('optimize', ['build'], function() {
  gulp.src('./dist/app.js')
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./dist'));

  gulp.src('./dist/app.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist'));
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

gulp.task('deploy', ['optimize'], function() {
  gulp.src('./dist/**/*')
    .pipe(awsS3.upload({path: ''}, {
      key: process.env.S3_ACCESS_KEY,
      secret: process.env.S3_SECRET,
      region: 'eu-west-1',
      bucket: 'finnishholidays.com'
    }));
});
