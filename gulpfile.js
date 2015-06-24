"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var nestedcss = require('postcss-nested');
var simplevars = require('postcss-simple-vars');

// CSS
gulp.task('css', function () {
    var processors = [
        autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'], cascade: false, remove: false }),
        mqpacker,
        csswring,
        nestedcss,
        simplevars
    ];
    return gulp.src('css/postcss/*.css')
        .pipe(postcss(processors))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'));
});


// JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});


// watch
gulp.task('watch', function() {
	gulp.watch('css/*.css', ['css'])
});

// default
gulp.task('default', ['css', 'watch']);
