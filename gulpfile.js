var gulp = require('gulp'),
  watch = require('gulp-watch'),
  less = require('gulp-less'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
//imagemin = require('gulp-imagemin'),
//pngquant = require('imagemin-pngquant'),
  mainBowerFiles = require('main-bower-files'),
  paths = {
    less: './assets/styles/styles.less',
    scripts: './assets/js/**/*.js',
    images: './assets/images/*',
    staticScriptsFolder: './.tmp/public/scripts',
    staticStylesFolder: './.tmp/public/styles',
    staticImagesFolder: './.tmp/public/images'
  };


gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.staticStylesFolder))
    .pipe(notify({message: 'Bower less task is completed'}));
});

gulp.task('bower-dev', function () {
  return gulp.src(mainBowerFiles())
    .pipe(concat('bower-components.js'))
    .pipe(gulp.dest(paths.staticScriptsFolder))
    .pipe(notify({message: 'Bower dev. task is completed'}));
});

gulp.task('bower-prod', function () {
  return gulp.src(mainBowerFiles())
    .pipe(concat('bower-components.js'))
    .pipe(uglify({mangle: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.staticScriptsFolder))
    .pipe(notify({message: 'Bower prod. task is completed'}));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    //.pipe(imagemin({
    //  progressive: true,
    //  svgoPlugins: [{removeViewBox: false}],
    //  use: [pngquant()]
    //}))
    .pipe(gulp.dest(paths.staticImagesFolder))
    .pipe(notify({message: 'Images task is completed'}));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.staticScriptsFolder))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(paths.staticScriptsFolder))
    .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('watch-less', function () {
  gulp.watch(paths.less, ['less']);
});

gulp.task('watch-scripts', function () {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('watch', ['watch-less', 'watch-scripts']);

gulp.task('default', ['scripts', 'less', 'bower-dev', 'images']);
