describe('JSHint', function () {

    function testFile(script) {
        it(script.getAttribute('src'), function() {
            if (gulpJasmineLivereloadTaskOptions.jasmine > '1.3') {
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
            JSHINT(script.innerHTML, gulpJasmineLivereloadTaskOptions.jshint.options);

            JSHINT.errors.forEach(function(error) {
                expect('line ' + error.line + ' - ' + error.reason).toBeEmptyMessage();
            });

            if (JSHINT.errors.length <= 0) {
                expect('').toBeEmptyMessage();
            }
        });
    }

    scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++) {
        script = scripts[i];
        if (script.getAttribute('type') === 'jshint') {
            testFile(script);
        }
    }
});
