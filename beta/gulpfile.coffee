# Nikhil Venkatesh
# 20 Feb 2017
# ----------------
# Install gulp and then run `npm i -D`

# Packages
## Utility
gulp = require 'gulp'
plumber = require 'gulp-plumber'
stripComments = require 'gulp-strip-comments'
notify = require 'gulp-notify'
newer = require 'gulp-newer'
dSync = require 'gulp-directory-sync'

browserSync = require 'browser-sync'
bSync = browserSync.create()

## Styles
sass = require 'gulp-sass'
prefix = require 'gulp-autoprefixer'
cssNano = require 'gulp-cssnano'
mediaQuery = require 'gulp-combine-mq'

## Scripts
uglify = require 'gulp-uglify'
concat = require 'gulp-concat'

## Content
nunjucks = require 'gulp-nunjucks-render'
prettify = require 'gulp-prettify'

## images
imagemin = require 'gulp-imagemin'
pngquant = require 'imagemin-pngquant'

# Variables
sync =
    scss: 'css/*.css'
    html: '**/*.html'

sources =
    content: '_src/*.njk'
    templates: '_src/templates'
    styles: '_src/scss/*.scss'
    allScss: '_src/scss/**/*.scss'
    images: '_src/img/**/*.+(png|jpg|jpeg|gif|svg)'
    scripts: '_src/scripts/**/*.js'

dests =
    content: './'
    styles: 'css'
    images: 'img'
    scripts: 'scripts'

# Tasks
## Sync Browser
gulp.task 'sync-task', ->
    bSync.init({
        server: './',
        browser: 'google chrome',
        ghostMode: false,
    })
    bSync.scrollRestoreTechnique= 'cookie';
    # gulp.watch(dests.scripts).on('change', bSync.reload)

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
    .pipe cssNano({zindex: false})
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
    # .pipe newer(dests.scripts)
    .pipe concat('all.js')
    .pipe uglify({ mangle: false})
    .pipe gulp.dest(dests.scripts)
    .pipe bSync.stream()

## Images
gulp.task 'images-task', ->
    onError = (err) ->
        notify.onError({
            title: 'Image Error',
            message: "<%= error.message %>",
            open: 'file://<%= error.file %>',
            onLast: true,
            sound: "Beep"
        })(err);
        this.emit('end')

    return gulp.src(sources.images)
    .pipe plumber({ errorHandler: onError })
    .pipe newer(dests.images)
    # .pipe imagemin({
    #     progressive: true,
    #     optimizationLevel: 3,
    #     interlaced: true,
    #     svgoPlugins: [{ removeViewBox: false, collapseGroups: false }],
    #     use:[pngquant()]
    # })
    .pipe gulp.dest(dests.images)
    .pipe dSync('_src/img', dests.images, { printSummary: true })
    .pipe bSync.stream()

## Watch
gulp.task 'watch', ->
    gulp.watch([sources.content, sources.templates+'/**/*.njk'],['content-task']);
    gulp.watch(sources.allScss, ['styles-task'])
    gulp.watch(sources.scripts, ['scripts-task'])
    gulp.watch(sources.images, ['images-task'])

## Default
gulp.task 'default', ['content-task', 'styles-task', 'sync-task', 'watch'], ->
