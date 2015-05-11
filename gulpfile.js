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
var s3 = require('gulp-s3');

gulp.task('default', ['build', 'connect', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('build', [
  'browserify',
  'html',
  'images',
  'sass'
]);

gulp.task('optimize', [
  'build',
  'optimize:js',
  'optimize:css'
]);

gulp.task('browserify', function() {
  return browserify('./src/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'));
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimize:js', ['build'], function() {
  return gulp.src('./dist/app.js')
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimize:css', ['build'], function() {
  return gulp.src('./dist/app.css')
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
  return gulp.src([
    './dist/**/*',
    '!./dist/**/*.jpg' // exclude images
  ])
    .pipe(s3(s3Config(), {
      uploadPath: '/',
      headers: {
        'x-amz-acl': 'public-read'
      }
    }));
});

gulp.task('deploy:all', ['optimize'], function() {
  return gulp.src('./dist/**/*')
    .pipe(s3(s3Config(), {
      uploadPath: '/',
      headers: {
        'x-amz-acl': 'public-read'
      }
    }));
});

function s3Config() {
  return {
    key: process.env.S3_ACCESS_KEY,
    secret: process.env.S3_SECRET,
    region: 'eu-west-1',
    bucket: 'finnishholidays.com'
  };
}
