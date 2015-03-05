var parentRequire = require('parent-require'),
    gulp = parentRequire('gulp'),
    extend = require('extend'),
    fs = require('fs'),
    path = require('path'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    open = require('open'),
    opened,
    template = {
        '1.3': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-1.3.1/SpecRunner.html',
        '2.0': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-2.0.2/SpecRunner.html',
        '2.1': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-2.1.3/SpecRunner.html',
        '2.2': 'node_modules/gulp-jasmine-livereload-task/vendor/jasmine-2.2.0/SpecRunner.html'
    },
    jshint = {
        '2.6': 'node_modules/gulp-jasmine-livereload-task/vendor/jshint-2.6.0/jshint.js'
    },
    defaults = {
        files: undefined,
        jasmine: '2.2',
        livereload: '35729',
        jshint: {
            version: '2.6',
            files: [],
            options: {}
        }
    },
    options;

module.exports = function(opts) {
    options = extend(true, {}, defaults, opts);

    return function() {
        createSpecrunner();
        livereload.listen({
            port: options.livereload
        });
        watch(options.files, createSpecrunner);
    };
};

function createSpecrunner () {
    var target = gulp.dest('.'),
        specrunner;

    target.on('end', function () {
        if (!opened) {
            if (!options.host) {
                open('file:///' + path.join(path.resolve('.'), 'SpecRunner.html'));
            } else {
                gulp.src('.')
                    .pipe(webserver({
                      open: 'SpecRunner.html',
                      host: options.host,
                      port: options.port
                    }));
            }
            opened = true;
        }
    });

    if (!fs.existsSync(template[options.jasmine])) {
        throw new Error('Jasmine version ' + options.jasmine + ' is currently not supported!');
    }

    specrunner = gulp.src(template[options.jasmine])
        .pipe(inject(gulp.src(options.files, {read: false}), {
            addRootSlash: false
        }))
        .pipe(replace(/<!-- options:js -->/g, '<script>var gulpJasmineLivereloadTaskOptions = JSON.parse(\'' + JSON.stringify(options) + '\');</script>'))
        .pipe(replace(/<!-- livereload:js -->/g, '<script src="http://localhost:' + options.livereload + '/livereload.js"></script>'));

    if (options.jshint.files.length > 0) {
        specrunner = specrunner
            .pipe(inject(gulp.src(options.jshint.files), {
            name: 'jshintfiles',
            addRootSlash: false,
            transform: function (filePath, file) {
                var source = file.contents.toString('utf8');
                return '<script type="jshint" src="' + filePath + '">' + source + '</script>\n';
            }
        }))
            .pipe(replace(/<!-- jshint:js -->/g, '<script src="' + jshint[options.jshint.version] + '"></script>\n<script src="node_modules/gulp-jasmine-livereload-task/jshint-spec.js"></script>'));
    }

    specrunner
        .pipe(target)
        .pipe(livereload());
}
