# gulp-jasmine-livereload-task

A [gulp](http://gulpjs.com/) plugin that runs [Jasmine](http://jasmine.github.io/) tests in browser with [livereload](http://livereload.com/).

![alt tag](http://people.inf.elte.hu/mucsi96/img/jasmine.png)
![alt tag](http://people.inf.elte.hu/mucsi96/img/jasmine-mobile.png)

## Installation

```
$ npm install --save-dev gulp-jasmine-livereload-task
```

## Basic usage

This is a sample gulpfile.js

```javascript
var gulp    = require('gulp'),
    jasmine = require('gulp-jasmine-livereload-task');

gulp.task('default', jasmine({
    files: ['./src/**/*.js', './spec/**/*.js']
}));

```

### Options

These options can be set through `jasmine(options)`.

```
files        Source files and specs
jasmine      Jasmine version. Default: 2.2. Supported versions: 1.3, 2.0, 2.1, 2.2
livereload   Livereload server port. Default: 35729
host         Host name. If need to be served
port         Port number. If need to be served
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
