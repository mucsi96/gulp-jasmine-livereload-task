describe('JSHint', function() {
    var options = {
            curly: true,
            white: true,
            indent: 2
        },
        files = /^\/src|.*Spec\.js$/,
        scripts,
        element,
        script;

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
            var result = JSHINT(source, options);
            JSHINT.errors.forEach(function(error) {
                expect('line ' + error.line + ' - ' + error.reason).toEqual('');
            });
        });
    }

    scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++) {
        element = scripts[i];
        script = element.getAttribute('src');
        if (files.test(script)) {
            testFile(script);
        }


    }
});
