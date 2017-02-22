# Nikhil Venkatesh
# 20 Feb 2017
# ----------------

# Packages
## Utility
gulp = require 'gulp'
plumber = require 'gulp-plumber'
stripComments = require 'gulp-strip-comments'
notify = require 'gulp-notify'

browserSync = require 'browser-sync'
bSync = browserSync.create()

## Styles
sass = require 'gulp-sass'
prefix = require 'gulp-autoprefixer'
cssNano = require 'gulp-cssnano'
mediaQuery = require 'gulp-combine-mq'

## Scripts
uglify = require 'gulp-uglify'
newer = require 'gulp-newer'

## Content
nunjucks = require 'gulp-nunjucks-render'
prettify = require 'gulp-prettify'

# Variables
sync =
    scss: 'css/*.css'
    html: '**/*.html'

sources =
    content: '_src/*.njk'
    templates: '_src/templates'
    styles: '_src/scss/*.scss'
    images: '_src/img/**/*.*'
    scripts: '_src/js/**/*.js'

dests =
    content: './'
    styles: 'css'
    images: 'img'
    scripts: 'js'

# Tasks
## Sync Browser
gulp.task 'sync-task', ->
    bSync.init({
        server: './',
        browser: 'google chrome'
    })
    gulp.watch(dests.scripts).on('change', bSync.reload)

## Content
gulp.task 'content-task', ->
    onError = (err) ->
        notify.onError({
            title: 'Nunjucks Error',
            message: "<%= error.message %>",
            open: 'file://<%= error.file %>',
            onLast: true,
            sound: "Beep"
        })(err);
        this.emit('end')

    return gulp.src(sources.content)
    .pipe plumber({ errorHandler: onError })
    .pipe nunjucks({ path: [sources.templates] })
    .pipe stripComments()
    .pipe prettify()
    .pipe gulp.dest('./')
    .pipe bSync.stream()

## Styles
gulp.task 'styles-task', ->
    onError = (err) ->
        notify.onError({
            title: 'SCSS Error',
            subtitle: [
                '<%= error.relativePath %>',
                '<%= error.line %>'
            ].join(':'),
            message: "<%= error.messageOriginal %>",
            open: 'file://<%= error.file %>',
            onLast: true,
            sound: "Beep"
        })(err);
        this.emit('end')

    return gulp.src(sources.styles)
    .pipe plumber({ errorHandler: onError })
    .pipe sass()
    .pipe mediaQuery()
    .pipe prefix({ browsers: ['last 4 versions'] })
    .pipe cssNano({ reduceIdents: false, zindex: false})
    .pipe gulp.dest(dests.styles)
    .pipe bSync.stream()

## Scripts
gulp.task 'scripts-task', ->
    onError = (err) ->
        notify.onError({
            title: 'JS Error',
            message: "<%= error.message %>",
            open: 'file://<%= error.file %>',
            onLast: true,
            sound: "Beep"
        })(err);
        this.emit('end')

    return gulp.src(sources.scripts)
    .pipe plumber({ errorHandler: onError })
    .pipe newer(dests.scripts)
    .pipe uglify()
    .pipe gulp.dest(dests.scripts)
    .pipe bSync.stream()

## Watch
gulp.task 'watch', ->
    gulp.watch([sources.content,sources.templates+'/**/*.njk'],['content-task'])
    gulp.watch(sources.styles, ['styles-task'])
    gulp.watch(sources.scripts, ['scripts-task'])

## Default
gulp.task 'default', ['content-task', 'styles-task','scripts-task','sync-task','watch'], ->
