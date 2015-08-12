var gulp = require('gulp'),
    sass = require('gulp-sass'),
    newer = require('gulp-newer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    scsslint = require('gulp-scsslint'),
    imagemin = require('gulp-imagemin'),
    minifycss = require('gulp-minify-css'),
    globbing = require('gulp-css-globbing'),
    livereload = require('gulp-livereload'),
    phpServer = require('php-built-in-server'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries');



// EXTRAS // ---------------------------------------------------------
// CSS linting
gulp.task('lint-css', function() {
  return gulp.src(['_theme/_assets/sass/**/*.scss', '!_theme/_assets/sass/vendor/*.scss'])
    .pipe(scsslint())
    .pipe(scsslint.reporter());
});

// JS linting
gulp.task('lint-js', function() {
  return gulp.src(['_theme/_assets/js/**/*.js', '!_theme/_assets/js/vendor/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});



// ROOT TASKS // ---------------------------------------------------------
// Main style task  
gulp.task('css', function() {
  return gulp.src('_theme/_assets/sass/*.scss')
    .pipe(globbing({extensions: '.scss'}))
    .pipe(sass())
    .pipe(cmq()) // combine all @media queries into the page base
    .pipe(autoprefixer({cascade: false})) // auto prefix
    .pipe(minifycss()) // minify everything
    .pipe(gulp.dest('assets/css'));
});

// Main Javascript task
gulp.task('js', function() {  
  return gulp.src('_theme/_assets/js/**/*.js')
    .pipe(newer('js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

// Main image task
gulp.task('img', function() {
  return gulp.src('_theme/_assets/img/**/*.{jpg,jpeg,png,gif,svg,ico}')
    .pipe(newer('img'))
    .pipe(imagemin({ 
      optimizationLevel: 5,
      progressive: true, 
      interlaced: true,
      svgoPlugins: [{
        collapseGroups: false,
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('assets/img'));
});



// FUNCTIONS // ---------------------------------------------------------
// Initial start function
gulp.task('start', ['img'], function() {
  gulp.start('js', 'css');
});

// Watch function
gulp.task('watch', ['start'], function() {
  gulp.watch('_theme/_assets/sass/**/*.scss', ['css']);
  gulp.watch('_theme/_assets/js/**/*.js', ['js']);
  gulp.watch('_theme/_assets/img/**/*', ['img']);
 
  livereload.listen();
  gulp.watch(['_theme/layouts/*.html', '_theme/partials/**/*.html', '_theme/templates/*.html', '_theme/js/**/*.js', '_theme/img/**/*.{jpg,jpeg,png,gif,svg,ico}', '_theme/css/*.css']).on('change', livereload.changed);
});

// Default function
gulp.task('default', ['watch'], function() {
  var server = new phpServer();
  
  server.on('listening', function(event) {});
  server.on('error', function (event) {});
  
  server.listen( '', 8000, 'localhost');
});