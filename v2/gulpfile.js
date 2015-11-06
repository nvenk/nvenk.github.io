var gulp = require('gulp'),
	newer = require('gulp-newer'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	globbing = require('gulp-css-globbing'),
	scsslint = require('gulp-scss-lint'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	include = require('gulp-file-include'),
	prettify = require('gulp-prettify'),
	cmq = require('gulp-combine-media-queries');

var browsersync = require('browser-sync').create();

// BrowserSync Static Server ------------------

gulp.task('serve', ['css'], function() {

    browsersync.init({
        server: "./",
        browser: "google chrome"
    });

    gulp.watch("src/style/**/*.scss", ['css']);
    gulp.watch("*.html").on('change', browsersync.reload);
});

//CSS Linting ---------------------------------

gulp.task('lint-scss', function() {
	return gulp.src(['src/style/**/*.scss', '!src/style/vendor/*.scss'])
	.pipe(scsslint())
	.pipe(scsslint.reporter());
});

//JS Linting ----------------------------------

gulp.task('lint-js', function(){
	return gulp.src(['src/scripts/**/*.js', '!src/scripts/vendor/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

// GULP TASKS //-------------------------------
// Content ------------------------------------
gulp.task('html', function() {
	gulp.src('src/*.html')
	.pipe(include({basepath: 'src/partials/'}))
	.pipe(prettify({
		indent_with_tabs: "true"
	}))
	.pipe(gulp.dest('./'))
});

// Styles -------------------------------------
gulp.task('css', function(){
	gulp.src('src/style/*.scss')
	.pipe(globbing({extensions: '.scss'})) // Glob all SASS files
	.pipe(sass()) // SASS Preprocessor
	// .pipe(cmq()) // Combine all Media Queries
	.pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false})) // Auto-Prefix
	.pipe(minifycss()) // Minify css
	.pipe(gulp.dest('assets/css'))
	.pipe(browsersync.stream());
});

// Scripts ------------------------------------
gulp.task('js', function(){
	gulp.src('src/scripts/**/*.js', '!src/scripts/vendor/*.js')
	.pipe(newer('assets/js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
});

// Images -------------------------------------
gulp.task('img', function(){
	gulp.src('src/img/**/*.{jpg,jpeg,png,gif,svg,ico}')
	.pipe(newer('assets/img'))
	.pipe(imagemin({
		optimizationLevel: 5,
      	progressive: true, 
      	interlaced: true,
      	svgoPlugins: [{
        	collapseGroups: false,
        	removeViewBox: false
      	}]
	}))
	.pipe(gulp.dest('assets/img'))
});

// FUNCTIONS //--------------------------------
// Watch Function
gulp.task('watch', function() {
	gulp.watch('src/**/*.html', ['html']);
	// gulp.watch('src/style/**/*.scss', ['css']);
	gulp.watch('src/scripts/**/*.js', ['js']);
	gulp.watch('src/img/**/*', ['img']);
});

// Default Function
gulp.task('default', ['serve', 'watch'], function(){});


