/**
 * Created by 동준 on 2015-05-03.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    nodemon = require('nodemon'),
    imagemin = require('gulp-imagemin'),
    imageminGifsicle = require('imagemin-gifsicle'),
    pngquant = require('imagemin-pngquant'),
    imageminJpegtran = require('imagemin-jpegtran'),
    minifyHTML = require('gulp-minify-html');

// lib Scripts
gulp.task('lib-scripts', function() {
    return gulp.src([
        "public/lib/jquery/dist/jquery.min.js"
    ])
        .pipe(concat('lib.js'))
        /*.pipe(stripDebug())*/
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/dist/lib/js'));
});

// Styles
gulp.task('styles', function() {
    return gulp.src([
        'public/src/css/*.css'
    ])
        .pipe(concatCss('wanname.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/css'))
        .pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src([
        'public/src/js/**/*.js'
    ])
        .pipe(concat('wannameApp.js'))
        /*.pipe(stripDebug())*/
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'))
        .pipe(livereload());
});

// imgs
gulp.task('img', function() {
    return gulp.src([
        'public/src/imgs/**/*'
    ])
        /*.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), imageminGifsicle({interlaced: true}), imageminJpegtran({progressive: true})]
        }))*/
        .pipe(gulp.dest('public/dist/imgs'));
});

// index.html 파일 복사
gulp.task('index-min', function(){
    return gulp.src('public/src/html/index.html')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyHTML())
        .pipe(gulp.dest('public/dist/html'))
        .pipe(livereload());
});

/** --------------- 공통 ------------------------------------------ */
// Clean
gulp.task('clean', function(cb) {
    del(['public/dist']).then(function(){
        cb(null);
    })
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('lib-scripts', 'styles', 'scripts', 'index-min', 'img');
});

// Watch
gulp.task('watch', function() {
    livereload({ start: true });
    livereload.listen();
    // Watch .css files
    gulp.watch('public/src/css/*.css', ['styles']);

    // Watch .js files
    gulp.watch(['public/src/js/**/*.js'], ['scripts']);

    // Watch index files
    gulp.watch('public/src/html/*.html', ['index-min']);

    // Watch img files
    gulp.watch(['public/src/img/**/*'], ['img']);
});

gulp.task('start', function () {
    nodemon({
        script: 'teaserApp.js'
        , ext: 'js html'
        , ignore: ['public/*', 'gulpfile.js']
    }).on('start', function(data) {
        /* console.log(data);
         setTimeout(function () {
         livereload.changed();
         }, 2000);*/
    })
});