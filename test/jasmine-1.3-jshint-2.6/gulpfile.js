var gulp    = require('gulp'),
    jasmine = require('gulp-jasmine-livereload-task');

gulp.task('test', jasmine({
    files: ['./src/**/*.js', './spec/**/*.js'],
    jasmine: '1.3',
    jshint: {
        files: ['./src/**/*.js', './spec/**/*.js'],
        version: '2.6',
        options: {
            curly: true,
            white: true,
            indent: 2
        }
    },
    watch: {
        options: {
            debounceTimeout: 1000,
            debounceImmediate: true
        }
    }
}));
