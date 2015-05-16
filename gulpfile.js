var bower = require('bower');
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./app/**/*.js'],
  templates: ['./app/*.html', './app/**/*.html'],
  other: ['./app/**/*.png']
};

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('default', ['sass', 'babel', 'templates', 'other']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('babel', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www'));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(gulp.dest('./www'));
});

gulp.task('other', function() {
  return gulp.src(paths.other)
    .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['babel']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.other, ['other']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }

  done();
});
