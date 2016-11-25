var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var processhtml = require('gulp-processhtml');

var config = {
  folders : {
    dist : 'dist'
    assets : 'assets'
  },

  plugins : {
    js : [
      'bower_components/html5shiv/dist/html5shiv.min.js',
      'bower_components/respond/dest/respond.min.js'
    ],
    jsConcat : [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
    ],
    css : [
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/font-awesome/css/font-awesome.min.css',
    ],
    fonts : [
      'bower_components/bootstrap/dist/fonts/*',
      'bower_components/font-awesome/fonts/*'
    ],
    img : [
    ]
  }
};

var paths = {
  dist : path.join(config.folders.dist),
  assets : path.join(config.folders.dist, config.folders.assets),
  html : path.join(config.folders.dist),
  js : path.join(config.folders.dist, config.folders.assets, 'js'),
  fonts : path.join(config.folders.dist, config.folders.assets, 'fonts'),
  css : path.join(config.folders.dist, config.folders.assets, 'css'),
  img : path.join(config.folders.dist, config.folders.assets, 'img'),
};

var targets = {
  dist : {
    environment: 'dist',
    data: {
      assets: config.folders.assets,
    },
  },
  dev : {
    environment: 'dev',
    data: {
      assets: config.folders.assets,
    },
  },
};

gulp.task('html', function(){
  gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
  .pipe(processhtml({
    recursive: true,
    process: true,
    strip: true,
    environment: targets.dev.environment,
    data: targets.dev.data,
  }))
  .pipe(gulp.dest(path.join(paths.html)));
});

gulp.task('js', function(){
  gulp.src('src/js/**/*.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.js));
});

gulp.task('clean', function(){
  return del([
    paths.html
  ]);
});

gulp.task('default', function(){
  runSequence(
    'clean',
    ['html', 'js']
  );
});
