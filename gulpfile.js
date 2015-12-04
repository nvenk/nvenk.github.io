var gulp = require('gulp'),
	newer = require('gulp-newer'),
	marked = require('marked'),
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
	removeComment = require('gulp-remove-html-comments'),
	cmq = require('gulp-combine-media-queries'); // Browse to project dir and install each package with npm install <package-name> --save-dev

var browsersync = require('browser-sync').create(); // Different install command: npm install browser-sync gulp --save-dev

// BrowserSync Static Server ------------------

gulp.task('serve', ['css'], function() {

    browsersync.init({
        server: "./",
        browser: "google chrome"
    });

    gulp.watch("src/sass/**/*.scss", ['css']);
    gulp.watch("*.html").on('change', browsersync.reload);
});

//CSS Linting ---------------------------------

gulp.task('lint-scss', function() {
	return gulp.src(['src/sass/**/*.scss', '!src/sass/vendor/*.scss'])
	.pipe(scsslint())
	.pipe(scsslint.reporter());
});

//JS Linting ----------------------------------

gulp.task('lint-js', function(){
	return gulp.src(['src/js/**/*.js', '!src/js/vendor/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

// GULP TASKS //-------------------------------
// Content ------------------------------------
gulp.task('html', function() {
	gulp.src('src/*.html')
	.pipe(include({
		basepath: 'src/html-partials/',
		filters: {
			markdown: marked.setOptions({})
		}}))
	.pipe(removeComment())
	.pipe(prettify({
		indent_with_tabs: "true"
	}))
	.pipe(gulp.dest('./'))
});

// Styles -------------------------------------
gulp.task('css', function(){
	gulp.src('src/sass/*.scss')
	.pipe(globbing({extensions: '.scss'})) // Glob all SASS files
	.pipe(sass()) // SASS Preprocessor
	.pipe(cmq()) // Combine all Media Queries
	.pipe(autoprefixer({browsers: ['last 4 versions'], cascade: false})) // Auto-Prefix
	.pipe(minifycss()) // Minify css
	.pipe(gulp.dest('assets/css'))
	.pipe(browsersync.stream());
});

// Scripts ------------------------------------
gulp.task('js', function(){
	gulp.src('src/js/**/*.js')
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
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/img/**/*', ['img']);
	gulp.watch('src/**/*.md',['html']);
});

// Default Function
gulp.task('default', ['serve', 'watch'], function(){});


