describe('JSHint', function () {
    var cacheName = 'gulpJasmineLivereloadTaskCache';

    function testFile(file) {
        it(file.path, function() {
            var cache,
                fileData,
                errors;

            if (gulpJasmineLivereloadTask.options.jasmine > '1.3') {
                jasmine.addMatchers({
                    toBeEmptyMessage: function () {
                        return {
                            compare: function (message) {
                                return {
                                    pass: !message,
                                    message: message
                                }
                            }
                        }
                    }
                });
            } else {
                this.addMatchers({
                    toBeEmptyMessage: function () {
                        var self = this;
                        this.message = function() {
                            return [self.actual];
                        };
                        return !this.actual;
                    }
                });
            }

            if(typeof(Storage) !== "undefined") {
                cache = JSON.parse(localStorage.getItem(cacheName));
                fileData = cache && cache[file.path];

                if (fileData && fileData.timeStamp === file.timeStamp) {
                    errors = fileData.errors;
                }
            }

            if (!errors) {
                console.log('Running jshint on "' + file.path + '"');
                JSHINT(decodeURI(file.source), gulpJasmineLivereloadTask.options.jshint.options);
                errors = JSHINT.errors;
            }

            errors.forEach(function(error) {
                expect('line ' + error.line + ' - ' + error.reason).toBeEmptyMessage();
            });

            if (errors.length <= 0) {
                expect('').toBeEmptyMessage();
            }

            if(typeof(Storage) !== "undefined") {
                if (!cache) {
                    cache = {};
                }

                cache[file.path] = {
                    timeStamp: file.timeStamp,
                    errors: errors
                };

                localStorage.setItem(cacheName, JSON.stringify(cache));
            }
        });
    }

    gulpJasmineLivereloadTask.sources.forEach(function (file) {
        testFile(file);
    });

});
