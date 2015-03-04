describe('JSHint', function() {

    function get(path) {
        path = path + "?" + new Date().getTime();

        var xhr;
        try {
            xhr = new XMLHttpRequest();
            xhr.open("GET", path, false);
            xhr.send(null);
        } catch (e) {
            throw new Error("couldn't fetch " + path + ": " + e);
        }
        if (xhr.status < 200 || xhr.status > 299) {
            throw new Error("Could not load '" + path + "'.");
        }

        return xhr.responseText;
    }

    function testFile(script) {
        it(script, function() {
            var self = this;
            var source = get(script);
            var result = JSHINT(source, gulpJasmineLivereloadTaskOptions.jshint.options);
            JSHINT.errors.forEach(function(error) {
                expect('line ' + error.line + ' - ' + error.reason).toEqual('');
            });

            if (JSHINT.errors.length <= 0) {
                expect(true).toEqual(true);
            }
        });
    }

    gulpJasmineLivereloadTaskOptions.jshint.expandedFiles.forEach(function (file) {
        testFile(file);
    });
});
