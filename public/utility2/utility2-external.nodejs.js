





























































































































/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true*/
/*global global, required, state, utility2*/
(function initModule() {
  'use strict';
  if (typeof window === 'object') {
    window.global = window.global || window;
  }
  global.required = global.required || {};
  return {
    cache: true,
    cachePrefix: '/rollup',
    postProcessing: function (content) {
      return content
        /* colors */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/colors\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {}; $1'
            + 'required.colors = exports;'
            + '}());'
        )
        /* connect logger */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/expressjs\/morgan\/master\/index\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {};'
            + 'require = function (module) { return function (arg) { return arg; }; };'
            + '$1'
            + 'required.connect_logger = exports;'
            + '}());'
        )
        /* csslint */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/csslint\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {}; $1'
            + 'required.csslint = CSSLint;'
            + '}());'
        )
        /* cssmin */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/cssmin\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {}; $1'
            + 'required.cssmin = cssmin; }());'
        )
        /* jslint */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/jslint\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {}; $1'
            + 'required.jslint = JSLINT; }());'
        )
        /* mime.types */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/mime\.types \*\/\n)([\S\s]+?)(\n\/\* MODULE_END \*\/\n)/g),
          function (_, header, content, footer) {
            utility2.nop(_);
            return header + '(function () { required.mime = { lookupDict: { /*'
              + content.replace((/^(\w\S+)\s+(\w.*)$/gm), function (_, value, keyList) {
                utility2.nop(_);
                return '*/' + keyList.replace((/\S+/g), function (key) {
                  return '"' + key + '":"' + value + '",';
                }) + '/*';
              }) + '*/ } }; }());' + footer;
          }
        )
        /* nodejs */
        .replace(
          (/(\n\/\* MODULE_BEGIN https:\/\/raw\.githubusercontent\.com\/joyent\/node\/master\/lib\/(\w+)\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {},'
            + 'process = global.process || {};'
            + 'require = function (module) { return required[module] };'
            + '$1'
            + 'required.$2 = module.exports; }());'
        )
        /* uglify-js */
        .replace(
          (/(\n\/\* MODULE_BEGIN https:\/\/raw\.githubusercontent\.com\/mishoo\/UglifyJS2\/master\/lib\/utils\.js \*\/\n[\S\s]+\n\/\* MODULE_BEGIN https:\/\/raw\.githubusercontent\.com\/mishoo\/UglifyJS2\/master\/lib\/mozilla-ast\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {}; $1'
            + 'required.uglifyjs = { parse: parse, Compressor: Compressor, OutputStream: OutputStream }; }());'
        );
    },
    urlList: [
      /* colors */
      'https://raw.githubusercontent.com/Marak/colors.js/master/colors.js',
      /* connect logger */
      'https://raw.githubusercontent.com/expressjs/morgan/master/index.js',
      /* csslint */
      'https://raw.githubusercontent.com/stubbornella/csslint/master/release/csslint.js',
      /* cssmin */
      'https://raw.githubusercontent.com/jbleuzen/node-cssmin/master/cssmin.js',
      /* jslint */
      'https://raw.githubusercontent.com/douglascrockford/JSLint/master/jslint.js',
      /* mime.types */
      'http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types',
      /* nodejs */
      'https://raw.githubusercontent.com/joyent/node/master/lib/util.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/path.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/punycode.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/querystring.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/url.js',
      /* uglifyjs */
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/utils.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/ast.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/parse.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/transform.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/scope.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/output.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/compress.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/sourcemap.js',
      'https://raw.githubusercontent.com/mishoo/UglifyJS2/master/lib/mozilla-ast.js'
    ]
  };
}());