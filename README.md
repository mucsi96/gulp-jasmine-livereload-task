# gulp-jasmine-livereload-task

A gulp plugin that runs Jasmine tests in browser with livereload.

## Installation

```
$ npm install --save-dev gulp-jasmine-livereload-task
```

## Basic usage

```javascript
var gulp    = require('gulp'),
    jasmine = require('gulp-jasmine-livereload-task');

gulp.task('default', jasmine({
    files: ['./src/**/*.js', './spec/**/*.js']
}));

```

### Options (Optional)

These options can be set through `jasmine(options)`.

```
files                     Source files and specs
jasmine                   Jasmine version. Default: 2.2. Supported versions: 1.3, 2.0, 2.1, 2.2
livereload                Livereload server port
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
