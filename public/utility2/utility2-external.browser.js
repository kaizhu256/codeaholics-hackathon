






































































/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true*/
/*global global, required, state, utility2*/
(function initModule() {
  'use strict';
  if (typeof window === 'object') {
    window.global = window.global || window;
  }
  /* init required object */
  global.required = global.required || {};
  return {
    cache: true,
    cachePrefix: '/rollup',
    postProcessing: function (content) {
      return content
        /* mime.types */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/mime.types \*\/\n)([\S\s]+?)(\n\/\* MODULE_END \*\/\n)/g),
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
        );
    },
    urlList: [
      /* mime.types */
      'https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types',
      /* nodejs */
      'https://raw.githubusercontent.com/joyent/node/master/lib/util.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/path.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/punycode.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/querystring.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/url.js'
    ]
  };
}());