var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var assign = require('lodash.assign');
var log = require('gulplog');

sass.compiler = require('node-sass');

var customOpts = {
  entries: ['./public/javascripts/builder.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

var paths = {
  styles: {
    src: 'public/stylesheets/**/*.scss',
    dest: 'public/stylesheets/'
  },
  scripts: {
    src: 'public/javascripts/**/*.js',
    dest: 'public/build/'
  }
};

function watch() {
  gulp.watch(paths.scripts.src, bundle);
  gulp.watch(paths.styles.src, styles);
}


function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log',log.info);

function bundle() {
  return b.bundle()
    .on('error', log.error.bind(log, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.scripts.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    // .pipe(babel())
    // .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

var build = gulp.parallel(styles, bundle);

exports.watch = watch;
exports.build = build;

exports.default = build;
