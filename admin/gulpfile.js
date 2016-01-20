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
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    livereload = require('gulp-livereload'),
    stripDebug = require('gulp-strip-debug');

/**--------------- lib ---------------------------------- **/
// lib Scripts
gulp.task('lib-scripts', function() {
    return gulp.src([
        "public/lib/jquery/dist/jquery.min.js"
        /* Angular */
        ,"public/lib/angular/angular.min.js"
        ,"public/lib/angular-animate/angular-animate.min.js"
        ,"public/lib/angular-sanitize/angular-sanitize.min.js"
        /* Bootstrap */
        ,"public/lib/bootstrap/dist/js/bootstrap.min.js"
        /* Angular Modules */
        ,"public/lib/angular-ui-router/release/angular-ui-router.min.js"
        ,"public/lib/ng-file-upload/ng-file-upload-shim.min.js"
        ,"public/lib/ng-file-upload/ng-file-upload.min.js"
        ,'public/lib/summernote/dist/summernote.min.js'
        ,'public/lib/angular-summernote/dist/angular-summernote.js'
        ,"public/lib/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js"
        ,"public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js"
        /* jquery lib 차트 */
        ,"public/lib/Flot/jquery.flot.js"
        ,"public/lib/Flot/jquery.flot.resize.js"
        ,"public/lib/flot.curvedlines/curvedLines.js"
        ,"public/lib/Flot/jquery.flot.pie.js"
        ,"public/lib/flot.tooltip/js/jquery.flot.tooltip.min.js"
        /* socket */
        ,"public/lib/socket.io-client/socket.io.js"
    ])
        .pipe(concat('lib.js'))
        /*.pipe(stripDebug())*/
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/dist/lib/js'));
});
// Styles
gulp.task('lib-styles', function() {
    return gulp.src([
        'public/lib/bootstrap/dist/css/bootstrap.min.css'
        ,'public/lib/summernote/dist/summernote.css'
    ])
        .pipe(concatCss('lib.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/lib/css'));
});
// Font move
gulp.task('font-move', function() {
    return gulp.src([
        'public/lib/bootstrap/dist/fonts/*'
    ])
        .pipe(gulp.dest('public/dist/lib/fonts'));
});
/**--------------- 관리자 ---------------------------------- **/
// Styles
gulp.task('admin-styles', function() {
    return gulp.src([
        'public/src/css/*.css'
    ])
        .pipe(concatCss('admin.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/css'))
        .pipe(livereload());
});

// Scripts
gulp.task('admin-scripts', function() {
    return gulp.src([
        'public/src/js/**/**/*.js'
    ])
        .pipe(concat('adminApp.js'))
        /*.pipe(stripDebug())*/
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'))
        .pipe(livereload());
});

// html 변환
gulp.task('admin-angular-template', function(){
    return gulp.src([
        'public/src/html/**/**/*.html',
        '!public/src/html/adminIndex.html'
    ])
        .pipe(templateCache())
        .pipe(gulp.dest('public/dist/templates'))
        .pipe(livereload());
});

// index.html 파일 복사
gulp.task('admin-index-min', function(){
    return gulp.src('public/src/html/adminIndex.html')
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
gulp.task('default', ['clean'], function(){
    gulp.start('admin-styles', 'admin-scripts', 'admin-angular-template', 'admin-index-min', 'lib-scripts', 'lib-styles', 'font-move');
});

// Watch
gulp.task('watch', function() {
    livereload({ start: true });
    livereload.listen();
    /** 관리자 */
    // Watch .css files
    gulp.watch('public/src/css/*.css', ['admin-styles']);

    // Watch .js files
    gulp.watch(['public/src/js/**/*.js'], ['admin-scripts']);

    // Watch index files
    gulp.watch('public/src/html/*.html', ['admin-index-min']);

    // Watch html files
    gulp.watch(['public/src/html/**/**/*.html', '!public/src/html/adminIndex.html'], ['admin-angular-template']);
});