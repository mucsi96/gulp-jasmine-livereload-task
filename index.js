var parentRequire = require('parent-require'),
    gulp = parentRequire('gulp'),
    extend = require('extend'),
    fs = require('fs'),
    path = require('path'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    livereload = require('gulp-livereload'),
    open = require('open'),
    opened,
    template = {
        '1.3': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-1.3.1/SpecRunner.html',
        '2.0': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-2.0.2/SpecRunner.html',
        '2.1': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-2.1.3/SpecRunner.html',
        '2.2': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-2.2.0/SpecRunner.html'
    },
    defaults = {
        jasmine: '2.2',
        livereload: '35729'
    },
    options;

module.exports = function(opts) {
    options = extend({}, defaults, opts);

    return function() {
        createSpecrunner();
        livereload.listen({
            port: options.livereload
        });
        gulp.watch(options.files, createSpecrunner);
    };
};

function createSpecrunner () {
    var target = gulp.dest('.');

    target.on('end', function () {
        if (!opened) {
            open('file:///' + path.join(path.resolve('.'), 'SpecRunner.html'));
            opened = true;
        }
    });

    if (!fs.existsSync(template[options.jasmine])) {
        throw new Error('Jasmine version ' + options.jasmine + ' is currently not supported!');
    }

    gulp.src(template[options.jasmine])
        .pipe(inject(gulp.src(options.files, {read: false}), {
            addRootSlash: false
        }))
        .pipe(replace(/<!-- livereload:js -->/g, '<script src="http://localhost:' + options.livereload + '/livereload.js"></script>'))
        .pipe(target)
        .pipe(livereload());
}
