








































































































































































































































































































































































































































































































































































































































































































































































































/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true, stupid: true*/
/*global global, required, state, utility2*/
(function moduleInitShared() {
  /*
    this shared module inits utility2
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleInitShared',

    _init: function () {
      var tmp;
      /* init global object */
      if (typeof window === 'object') {
        window.global = window;
      }
      /* init utility2 object */
      global.utility2 = global.required.utility2 = global.utility2 || {};
      local.setDefault(global, {
        /* global state object */
        state: {
          /* list of test-generated errors to be ignored */
          onEventErrorDefaultIgnoreList: [],
          /* dict of cached files */
          fsWatchDict: {},
          /* dict of server-side test callbacks to be triggered by the browser */
          testCallbackDict: {},
          /* default timeout */
          timeoutDefault: 120000
        },
        /* global utility2 object */
        utility2: {
          assert: local.assert,
          deferCallback: local.deferCallback,
          initLocal: local.initLocal,
          onEventErrorDefault: local.onEventErrorDefault,
          onEventTimeout: local.onEventTimeout,
          setDefault: local.setDefault
        }
      });
      /* init debug print */
      global[['debug', 'Print'].join('')] = utility2._zxqjDp = function (arg) {
        /*
          this internal function is used for tmp debugging,
          and jslint will nag you to remove it if used
        */
        console.error('\n\n\ndebug' + 'Print');
        console.error.apply(console, arguments);
        console.error();
        /* return arg for inspection */
        return arg;
      };
      /* init global.onEventError debug callback */
      global.onEventError = utility2.onEventErrorDefault;
      /* init utility2 for nodejs */
      if (state.modeNodejs) {
        /* require utility2-external */
        if (process.argv.indexOf('--mode-cli=npmInstall') < 0) {
          required.utility2_external = required.utility2_external
            || utility2.require('./public/utility2/utility2-external.nodejs.rollup.js');
        }
      }
      /* init utility2 for browser */
      if (global.document
          && document.body
          && global.location
          && typeof location.hash === 'string'
          && global.window) {
        state.modeBrowser = true;
        state.modeCoverageInit = 2;
        /* set browser test mode */
        state.modeTest = state.modeTest || (/\bmodeTest=\w/).test(location.hash);
        /* set browser timeoutDefault */
        tmp = (/\btimeoutDefault=(\d+)\b/).exec(location.hash);
        state.timeoutDefault = tmp ? Number(tmp[1]) : state.timeoutDefault;
      }
      /* init utility2.untilReadyUtility2 */
      utility2.untilReadyUtility2 = utility2.untilReadyUtility2 || function (onEventError) {
        /*
          this function defers the onEventError callback until utility2 is ready
        */
        utility2.deferCallback('untilReadyUtility2', 'defer', onEventError);
      };
      /* init utility2.readyUtility2 */
      utility2.readyUtility2 = utility2.readyUtility2 || local.untilReady(function (error) {
        /*
          this function is called to indicate that a component of utility2 is ready
        */
        utility2.deferCallback('untilReadyUtility2', 'ready', error);
      });
      /* utility2 ready */
      utility2.readyUtility2.remaining += 1;
      setTimeout(utility2.readyUtility2);
      /* init module */
      utility2.initLocal(local);
      /* assert state.timeoutDefault is a positive, finite number */
      setTimeout(function () {
        utility2.assert(
          0 < state.timeoutDefault && state.timeoutDefault < Infinity,
          'invalid state.timeoutDefault ' + state.timeoutDefault
        );
      });
    },

    _initOnce: function () {
      /* init utility2.error object */
      utility2.error = utility2.error || new Error('utility2 error');
      /* init state.testReport */
      state.testReport = state.testReport || {};
      utility2.testReportMerge(state.testReport);
      /* init browser */
      local._initOnceBrowser(global);
    },

    _initOnceBrowser: function (global2) {
      /*
        this function runs browser-side initializations
      */
      if (!state.modeBrowser) {
        return;
      }
      /* mock required.colors */
      required.colors = required.colors || {};
      [
        'black', 'blackBG', 'blue', 'blueBG', 'bold',
        'cyan', 'cyanBG',
        'green', 'greenBG', 'grey', 'greyBG',
        'inverse', 'italic',
        'magenta', 'magentaBG',
        'rainbow', 'red', 'redBG',
        'strikethrough', 'stripColors',
        'underline',
        'white', 'whiteBG',
        'yellow', 'yellowBG',
        'zebra'
      ].forEach(function (color) {
        required.colors[color] = required.colors[color] || utility2.echo;
      });
      /* save erver-side testCallbackId */
      state.testCallbackId = utility2.urlParamsGet(global2.location.search).testCallbackId;
      /* init testReportDiv element */
      state.testReportDiv = global2.document.getElementById('testReportDiv');
      if (state.testReportDiv) {
        utility2.readyUtility2.remaining += 1;
        setTimeout(function () {
          /* get testReport html template */
          utility2.ajax({
            url: '/public/utility2/testReport.html.template'
          }, function (error, data) {
            state.fsWatchDict['/public/utility2/testReport.html.template'] = {
              contentBrowser: data
            };
            utility2.readyUtility2(error);
            utility2.clearCallSetInterval('testReportDivUpdate', function () {
              state.testReportDiv.innerHTML
                = utility2.testReportHtml(state.testReport);
            }, 1000, state.timeoutDefault);
          });
        });
      } else {
        state.testReportDiv = {};
      }
    },

    __initOnceBrowser_default_test: function (onEventError) {
      /*
        this function tests _initOnceBrowser's default handling behavior
      */
      var data, global2;
      utility2.testMock(onEventError, [
        [global, { required: { url: required.url }, state: {} }],
        [utility2, { deferCallback: utility2.callArg2 }]
      ], function (onEventError) {
        /* test browser mode disabed handling behavior */
        state.modeBrowser = false;
        local._initOnceBrowser({});
        data = utility2.jsonStringifyOrdered(global.state);
        /* validate state */
        utility2.assert(data === JSON.stringify({ modeBrowser: false }), data);
        /* test browser mode handling behavior */
        state.modeBrowser = true;
        global2 = {
          /* test state.testReportDiv disabled handling behavior */
          document: { getElementById: utility2.nop },
          location: { search: '' }
        };
        local._initOnceBrowser(global2);
        data = utility2.jsonStringifyOrdered(global.state);
        /* validate state */
        utility2.assert(data === JSON.stringify({
          modeBrowser: true,
          testCallbackId: undefined,
          testReportDiv: {}
        }), data);
        onEventError();
      });
    },

    callArg0: function (callback) {
      /*
        this function calls the callback in arg position 0
      */
      callback();
    },

    callArg1: function (_, callback) {
      /*
        this function calls the callback in arg position 1
      */
      utility2.nop(_);
      callback();
    },

    callArg2: function (_, __, callback) {
      /*
        this function calls the callback in arg position 2
      */
      utility2.nop(_, __);
      callback();
    },

    callError0: function (onEventError) {
      /*
        this function calls the onEventError callback in arg position 0 with an error object
      */
      onEventError(utility2.error);
    },

    callError1: function (_, onEventError) {
      /*
        this function calls the onEventError callback in arg position 1 with an error object
      */
      utility2.nop(_);
      onEventError(utility2.error);
    },

    callError2: function (_, __, onEventError) {
      /*
        this function calls the onEventError callback in arg position 2 with an error object
      */
      utility2.nop(_, __);
      onEventError(utility2.error);
    },

    _callX_default_test: function (onEventError) {
      /*
        this function tests callX's default handling behavior
      */
      utility2.callArg0(function (error) {
        /* assert no error occurred */
        utility2.assert(!error, error);
      });
      utility2.callArg1(null, function (error) {
        /* assert no error occurred */
        utility2.assert(!error, error);
      });
      utility2.callArg2(null, null, function (error) {
        /* assert no error occurred */
        utility2.assert(!error, error);
      });
      utility2.callError0(function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      utility2.callError1(null, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      utility2.callError2(null, null, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      onEventError();
    },

    assert: function (passed, message) {
      /*
        this function throws an error if the assertion fails
      */
      if (!passed) {
        /* if message is an Error object, then get its stack trace */
        message = message instanceof Error
          ? utility2.errorStack(message)
          /* if message is a string, then leave it as is */
          : typeof message === 'string'
          ? message
          /* else JSON.stringify message */
          : utility2.jsonStringifyCircular(message);
        throw new Error('assertion error - ' + (message || 'undefined'));
      }
    },

    _assert_default_test: function (onEventError) {
      /*
        this function tests assert's default handling behavior
      */
      /* test assertion passed */
      utility2.assert(true, true);
      /* test assertion failed */
      utility2.tryCatch(function () {
        utility2.assert(false, undefined);
      }, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      /* test assertion failed with text message */
      utility2.tryCatch(function () {
        utility2.assert(false, '_assert_default_test');
      }, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      /* test assertion failed with error object */
      utility2.tryCatch(function () {
        utility2.assert(false, utility2.error);
      }, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      onEventError();
    },

    clearCallSetInterval: function (key, callback, interval, timeout) {
      /*
        this function
        1. clear old interval / timeout key
        2. run callback
        3. set interval key to callback
      */
      var dict;
      dict = state.clearCallSetIntervalDict = state.clearCallSetIntervalDict || {};
      dict[key] = dict[key] || {};
      /* 1. clear old interval / timeout key */
      clearInterval(dict[key].interval);
      clearTimeout(dict[key].timeout);
      /* set timeout for clearCallSetInterval */
      if (timeout) {
        dict[key].timeout = utility2.onEventTimeout(function (error) {
          utility2.clearCallSetInterval(key, 'clear');
          callback(error);
        }, timeout, key);
      }
      /* clear timer */
      if (callback === 'clear') {
        delete dict[key];
        return;
      }
      /* 2. call callback */
      callback();
      /* 3. set interval key to callback */
      if (dict[key]) {
        dict[key].interval = setInterval(callback, interval);
        return dict[key].interval;
      }
    },

    _clearCallSetInterval_synchronous_test: function (onEventError) {
      /*
        this function tests clearCallSetInterval's synchronous handling behavior
      */
      var ii, key;
      ii = 0;
      key = utility2.uuid4();
      utility2.clearCallSetInterval(key, function (error) {
        ii += 1;
        utility2.tryCatch(function () {
          /* assert no error occurred */
          utility2.assert(!error, error);
          utility2.clearCallSetInterval(key, 'clear');
          onEventError();
        }, onEventError);
      }, 1000);
      /* assert callback was called synchronously before setInterval */
      utility2.assert(ii === 1, ii);
    },

    _clearCallSetInterval_timeout_test: function (onEventError) {
      /*
        this function tests clearCallSetInterval's timeout handling behavior
      */
      var ii, onEventReady;
      ii = 0;
      onEventReady = utility2.untilReady(onEventError);
      [100, 500, 1000].forEach(function (timeout) {
        var key, time;
        key = utility2.uuid4();
        onEventReady.remaining += 1;
        time = Date.now();
        utility2.clearCallSetInterval(key, function (error) {
          ii += 1;
          utility2.tryCatch(function () {
            if (error) {
              /* assert error occurred */
              utility2.assert(error instanceof Error);
              /* assert error is timeout error */
              utility2.assert(error.code === 'ETIMEDOUT');
              time = Date.now() - time;
              /* assert time passed is greater than timeout */
              /* bug - ie and opera may timeout slightly earlier, so increase the timeout */
              utility2.assert(1.5 * time >= timeout, time);
              onEventReady();
            }
          }, onEventReady);
        }, 500, timeout);
      });
      /* test synchronous handling behavior */
      utility2.assert(ii === 3, ii);
    },

    _createTest: function (global, local2) {
      /*
        this function creates a _Test object
      */
      var self, testReport;
      self = new local._Test();
      self.global = global;
      self.local2 = local2;
      /* init testReport */
      testReport = self.global.state.testReport;
      utility2.testReportMerge(testReport);
      /* init testReport.totalTime */
      testReport.totalTime = testReport.totalTime || Date.now();
      /* init testReport.onEventReady */
      testReport.onEventReady = testReport.onEventReady || utility2.untilReady(function () {
        /* record time for testReport to run */
        testReport.totalTime = utility2.timeElapsed(testReport.totalTime);
        /* assert state.onEventErrorDefaultIgnoreList is empty */
        utility2.assert(!state.onEventErrorDefaultIgnoreList
          || state.onEventErrorDefaultIgnoreList.length === 0,
          state.onEventErrorDefaultIgnoreList);
        /* assert the following objects have no side-effect properties resulting from test */
        [
          utility2.callArg0, utility2.callArg1, utility2.callArg2,
          utility2.callError0, utility2.callError1, utility2.callError2
        ].forEach(function (obj) {
          utility2.assert(Object.keys(obj).length === 0, Object.keys(obj));
        });
        /* report test results */
        self.report();
      });
      return self;
    },

    _debug_print_default_test: function (onEventError) {
      /*
        this function tests debug print's default handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: null }]
      ], function (onEventError) {
        var message;
        message = '';
        console.error = function (_) {
          message += (_ || '') + '\n';
        };
        utility2._zxqjDp('_debug_print_default_test');
        utility2.assert(
          message === '\n\n\ndebug' + 'Print\n_debug_print_default_test\n\n',
          message
        );
        onEventError();
      });
    },

    deferCallback: function (key, mode, callback) {
      /*
        this function defers the callback until ready
      */
      var self;
      self = state.deferCallbackDict = state.deferCallbackDict || {};
      self = self[key] = self[key] || { callbackList: [] };
      switch (mode) {
      case 'defer':
        /* optimization - fast callback if ready-state already triggered */
        if (self.modeReady) {
          callback(self.error);
          return;
        }
        /* slow deferred callback */
        self.callbackList.push(callback);
        break;
      case 'delete':
        delete state.deferCallbackDict[key];
        break;
      case 'ready':
        self.error = callback;
        self.modeReady = true;
        while (self.callbackList.length) {
          utility2.deferCallback(key, 'defer', self.callbackList.shift());
        }
        break;
      }
    },

    echo: function (arg) {
      return arg;
    },

    _echo_default_test: function (onEventError) {
      /*
      this function tests echo's default handling behavior
      */
      var data;
      data = utility2.echo('_echo_default_test');
      utility2.assert(data === '_echo_default_test', data);
      onEventError();
    },

    errorStack: function (error) {
      /*
        this function returns the error's stack or message attribute if possible
      */
      return error && (error.stack || error.message || error);
    },

    evalOnEventError: function (file, script, onEventError) {
      /*
        this function evals the script in a try-catch block with error handling,
        in the utility2 module context
      */
      if (file instanceof Error) {
        onEventError(file);
        return;
      }
      utility2.tryCatch(function () {
        /*jslint evil: true*/
        onEventError(null, state.modeNodejs
          /* eval in nodejs */
          ? required.vm.runInThisContext(script, file)
          /* eval in browser */
          : eval(script));
      }, onEventError);
    },

    _evalOnEventError_default_test: function (onEventError) {
      /*
        this function tests evalOnEventError's default handling behavior
      */
      /* test default handling behavior */
      utility2.evalOnEventError(
        '_evalOnEventError_default_test.js',
        '"_evalOnEventError_default_test"',
        function (error, data) {
          /* assert no error occurred */
          utility2.assert(!error, error);
          utility2.assert(data === '_evalOnEventError_default_test', data);
        }
      );
      /* test error handling behavior */
      utility2.evalOnEventError(utility2.error, null, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      /* test syntax error handling behavior */
      utility2.evalOnEventError(
        '_evalOnEventError_default_test.js',
        '_evalOnEventError_default_test',
        function (error) {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
        }
      );
      onEventError();
    },

    initLocal: function (local2) {
      /*
        this function inits the module with the local object
      */
      var exports;
      /* assert local2._name */
      utility2.assert(local2._name, 'invalid local2._name ' + local2._name);
      /* module exports */
      exports = local2._name.split('.');
      exports = required[exports[0]] = required[exports[0]] || {};
      Object.keys(local2).forEach(function (key) {
        var match;
        /* ignore test items */
        if (key.slice(-5) === '_test') {
          return;
        }
        /* set dict items to state object */
        match = (/(.+Dict)_(.*)/).exec(key);
        if (match) {
          state[match[1]] = state[match[1]] || {};
          state[match[1]][match[2]] = local2[key];
          return;
        }
        /* set prototype items to object's prototype */
        match = (/(.+)_prototype_(.+)/).exec(key);
        if (match) {
          local2[match[1]].prototype[match[2]] = local2[key];
          return;
        }
        /* angularjs app */
        match = (/(\w+)_ngApp_(\w+)_(\w+)/).exec(key);
        if (match) {
          local2[match[1]] = local2[match[1]] || global.angular.module(match[1], []);
          local2[match[1]][match[2]](match[3], local2[key]);
          return;
        }
        /* set remaining items to exports */
        if (key[0] !== '_') {
          exports[key] = local2[key];
        }
      });
      /* wait until coverage is ready */
      if (state.modeCoverageInit <= 1) {
        return;
      }
      /* init local2._initOnce */
      state.initOnceDict = state.initOnceDict || {};
      if (local2._initOnce && !state.initOnceDict[local2._name]) {
        state.initOnceDict[local2._name] = true;
        local2._initOnce();
      }
      /* wait until utility2 is ready before running tests */
      state.testModuleDict = state.testModuleDict || { utility2: true };
      utility2.untilReadyUtility2(function () {
        /* init test */
        if ((local2._modeTest
              || (state.modeTest && state.testModuleDict[local2._name.split('.')[0]]))) {
          local._createTest(global, local2).run();
        }
      });
    },

    _moduleInit_default_test: function (onEventError) {
      /*
        this function tests initLocal's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, {
          angular: { module: function () {
            return { controller: utility2.nop };
          } },
          required: { _moduleInit_default_test: null },
          state: {
            /* test browser mode handling behavior */
            modeBrowser: true,
            /* test coverage handling behavior */
            modeCoverageInit: 2,
            /* test nodejs mode handling behavior */
            modeNodejs: true,
            /* test test mode disabled handling behavior */
            modeTest: false
          }
        }],
        [utility2, { fsWatch: utility2.nop }]
      ], function (onEventError) {
        var exports, local2;
        local2 = {
          /* test dict handling behavior */
          _aaDict_bb: true,
          /* test class handling behavior */
          _Aa: utility2.nop,
          /* test class prototype handling behavior */
          _Aa_prototype_bb: utility2.nop,
          /* test angularjs app handling behavior */
          _aa_ngApp_controller_bb: [],
          _name: '_moduleInit_default_test'
        };
        /* test default handling behavior */
        utility2.initLocal(local2);
        /* assert local2._Aa.prototype.bb exists */
        utility2.assert(local2._Aa.prototype.bb, local2._Aa.prototype);
        /* assert exports exists */
        exports = required._moduleInit_default_test;
        utility2.assert(exports, exports);
        /* assert local2._aa exists */
        utility2.assert(local2._aa, local._aa);
        onEventError();
      });
    },

    jsonCopy: function (object) {
      /*
        this function deep copies the json object using JSON.parse(JSON.stringify(object))
      */
      return JSON.parse(JSON.stringify(object));
    },

    jsonLog: function (message, data) {
      /*
        this function uses JSON.stringify to give a consistent print format
        across various javascript platforms
      */
      if (state.modeSilent) {
        return;
      }
      message = message || '';
      /* JSON.stringify data */
      if (data) {
        message += ' ' + utility2.jsonStringifyCircular(data);
      }
      /* security - scrub sensitive key / value pairs in json data from log */
      message = message.replace(
        (/"[^"]*(?:auth|key|login|passw|secret|token)[\S\s]*?([,}])/gi),
        function (_, match1) {
          utility2.nop(_);
          return match1 === ',' ? '' : match1;
        }
      );
      console.log(message);
    },

    _jsonLog_default_test: function (onEventError) {
      /*
        this function tests jsonLog's default handling behavior
      */
      var message;
      utility2.testMock(onEventError, [
        [global, { state: { modeSilent: null } }],
        [console, { log: function (_) {
          message = _;
        } }]
      ], function (onEventError) {
        /* test null arguments handling behavior */
        utility2.jsonLog();
        /* assert no message */
        utility2.assert(!message, message);
        /* test silent handling behavior */
        state.modeSilent = true;
        utility2.jsonLog('_jsonLog_default_test');
        /* assert no message */
        utility2.assert(!message, message);
        /* test default handling behavior */
        state.modeSilent = null;
        utility2.jsonLog('_jsonLog_default_test', {});
        /* assert message has json data */
        utility2.assert(message === '_jsonLog_default_test {}', message);
        /* test null json data handling behavior */
        utility2.jsonLog('_jsonLog_default_test');
        /* assert message has no json data */
        utility2.assert(message === '_jsonLog_default_test', message);
        /* test security handling behavior */
        utility2.jsonLog('_jsonLog_default_test', { secret1: 'aa', secret2: 'bb' });
        /* assert sensitive data has been scrubbed from message */
        utility2.assert(message === '_jsonLog_default_test {}', message);
        onEventError();
      });
    },

    jsonParseHandler: function (onEventError) {
      /*
        this function returns a callback that will JSON.parse the data with error handling
      */
      return function (error, data) {
        if (error) {
          onEventError(error);
          return;
        }
        try {
          /* accept undefined data */
          if (data !== undefined) {
            data = JSON.parse(data);
          }
        } catch (error2) {
          onEventError(error2);
          return;
        }
        onEventError(null, data);
      };
    },

    _jsonParseHandler_default_test: function (onEventError) {
      /*
        this function tests jsonParseHandler's default handling behavior
      */
      /* test default handling behavior */
      utility2.jsonParseHandler(function (error, data) {
        /* assert no error occurred */
        utility2.assert(!error, error);
        utility2.assert(data === '_jsonParseHandler_default_test', data);
      })(null, '"_jsonParseHandler_default_test"');
      /* test error handling behavior */
      utility2.jsonParseHandler(function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      })(null, '_jsonParseHandler_default_test');
      /* test undefined handling behavior */
      utility2.jsonParseHandler(function (error, data) {
        /* assert no error occurred */
        utility2.assert(!error, error);
        utility2.assert(data === undefined, data);
      })();
      onEventError();
    },

    jsonStringifyCircular: function (value, replacer, space) {
      /*
        this function JSON.stringify's the value, ignoring circular references.
        documentation for the arguments provided @
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON
      */
      return JSON.stringify(local._jsonStringifyCircularRecurse(value, []), replacer, space);
    },

    _jsonStringifyCircular_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyCircular's default handling behavior
      */
      var circular, data;
      /* test undefined handling behavior */
      data = utility2.jsonStringifyCircular(undefined);
      utility2.assert(data === undefined, data);
      /* test circular handling behavior */
      circular = {};
      circular.circular = circular;
      circular = {'aa': [1, circular, 2], 'bb': utility2.nop };
      data = utility2.jsonStringifyCircular(circular);
      utility2.assert(data === '{"aa":[1,{},2]}', data);
      onEventError();
    },

    _jsonStringifyCircularRecurse: function (value, circularList) {
      /*
        this function recurses through the value looking for circular objects
      */
      var result;
      /* return the value if its falsey */
      if (!value) {
        return value;
      }
      /* return undefined if the value is a dom element or circular */
      if ((global.HTMLElement && value instanceof global.HTMLElement)
          || circularList.indexOf(value) >= 0) {
        return;
      }
      /* return the value if JSON.stringify succeeds */
      utility2.tryCatch(function () {
        result = JSON.stringify(value);
      }, utility2.nop);
      if (result) {
        return value;
      }
      /* fallback code if JSON.stringify fails */
      /* add the value to circularList */
      circularList.push(value);
      /* the value is a function */
      if (typeof value === 'function') {
        return;
      }
      /* value is an array */
      if (Array.isArray(value)) {
        return value.map(function (element) {
          return local._jsonStringifyCircularRecurse(element, circularList);
        });
      }
      /* value is an object */
      result = {};
      Object.keys(value).forEach(function (key) {
        result[key] = local._jsonStringifyCircularRecurse(value[key], circularList);
      });
      return result;
    },

    jsonStringifyOrdered: function (value, replacer, space) {
      /*
        this function JSON.stringify's the value with dictionaries in sorted order,
        allowing reliable / reproducible string comparisons and tests
      */
      return JSON.stringify(value && (typeof value === 'object' || Array.isArray(value))
        ? JSON.parse(
          local._jsonStringifyOrderedRecurse(local._jsonStringifyCircularRecurse(value, []))
        )
        : value, replacer, space);
    },

    _jsonStringifyOrdered_default_test: function (onEventError) {
      /*
        this function tests jsonStringifyOrdered's default handling behavior
      */
      var data;
      /* test undefined handling behavior */
      data = utility2.jsonStringifyOrdered(undefined);
      utility2.assert(data === undefined, data);
      /* test function handling behavior */
      data = utility2.jsonStringifyOrdered(utility2.nop);
      utility2.assert(data === undefined, data);
      /* test default handling behavior */
      data = utility2.jsonStringifyOrdered({
        ee: {},
        dd: [undefined],
        cc: utility2.nop,
        bb: 2,
        aa: 1
      });
      utility2.assert(data === '{"aa":1,"bb":2,"dd":[null],"ee":{}}', data);
      onEventError();
    },

    _jsonStringifyOrderedRecurse: function (value) {
      /*
        this function recurses the value looking for dictionaries to order
      */
      value = Array.isArray(value)
        ? '[' + value.map(local._jsonStringifyOrderedRecurse).join(',') + ']'
        : typeof value !== 'object' || !value
        ? JSON.stringify(value)
        /* sort list of keys */
        : '{' + Object.keys(value).filter(function (key) {
          return JSON.stringify(value[key]) !== undefined;
        }).sort().map(function (key) {
          return JSON.stringify(key) + ':' + local._jsonStringifyOrderedRecurse(value[key]);
        }).join(',') + '}';
      return value === undefined ? 'null' : value;
    },

    mimeLookup: function (file) {
      /*
        this function returns the file's mime-type
      */
      file = required.path.extname(file).slice(1);
      switch (file) {
      case 'css':
        return 'text/css';
      case 'html':
        return 'text/html';
      case 'js':
        return 'application/javascript';
      case 'json':
        return 'application/json';
      case 'txt':
        return 'text/plain';
      default:
        return required.mime.lookupDict[file];
      }
    },

    _mimeLookup_default_test: function (onEventError) {
      /*
        this function tests mimeLookup's default handling behavior
      */
      var data;
      data = utility2.mimeLookup('foo.css');
      utility2.assert(data === 'text/css', data);
      data = utility2.mimeLookup('foo.html');
      utility2.assert(data === 'text/html', data);
      data = utility2.mimeLookup('foo.js');
      utility2.assert(data === 'application/javascript', data);
      data = utility2.mimeLookup('foo.json');
      utility2.assert(data === 'application/json', data);
      data = utility2.mimeLookup('foo.txt');
      utility2.assert(data === 'text/plain', data);
      data = utility2.mimeLookup('foo');
      utility2.assert(data === undefined, data);
      onEventError();
    },

    modeIncrement: function (error, mode) {
      /*
        this function increments the mode if no error occurs or returns -1
        it is used to improve conditional branch coverage in asynchronous tests
      */
      return error instanceof Error ? -1 : mode + 1;
    },

    _modeIncrement_default_test: function (onEventError) {
      /*
        this function tests modeIncrement's default handling behavior
      */
      var mode;
      mode = 0;
      /* test null error handling behavior */
      mode = utility2.modeIncrement(null, mode);
      utility2.assert(mode === 1, mode);
      /* test error handling behavior */
      mode = utility2.modeIncrement(utility2.error, mode);
      utility2.assert(mode === -1, mode);
      onEventError();
    },

    nop: function () {
      /*
        this function performs no operation (nop)
      */
      return;
    },

    _nop_default_test: function (onEventError) {
      /*
        this function tests nop's default handling behavior
      */
      utility2.nop();
      onEventError();
    },

    onEventErrorDefault: function (error, data) {
      /*
        this function provides a default, error / data handling callback.
        if an error is given, it will print the error's message and stack,
        else it will print the data
      */
      var ii;
      if (error) {
        /* ignore test-generated errors */
        for (ii = 0; ii < (state.onEventErrorDefaultIgnoreList || []).length; ii += 1) {
          if (state.onEventErrorDefaultIgnoreList[ii] === error.message) {
            state.onEventErrorDefaultIgnoreList.splice(ii, 1);
            return;
          }
        }
        /* debug error */
        state.debugError = error;
        /* print error */
        state.debugMessage
          = '\nonEventErrorDefault - error\n' + utility2.errorStack(error) + '\n';
        console.error(state.debugMessage);
      /* print data if it's defined and not an empty string */
      } else if (data !== undefined && data !== '') {
        /* debug data */
        state.debugData = data;
        state.debugMessage = '\nonEventErrorDefault - data\n'
          + utility2.jsonStringifyCircular(data, null, 2) + '\n';
        utility2.jsonLog(state.debugMessage);
      }
    },

    _onEventErrorDefault_default_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: {} }]
      ], function (onEventError) {
        utility2.onEventErrorDefault(null, '_onEventErrorDefault_default_test');
        onEventError();
      });
    },

    _onEventErrorDefault_error_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's error handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }],
        [global, { state: {} }]
      ], function (onEventError) {
        var error;
        error = new Error('_onEventErrorDefault_error_test');
        /* test error.stack handling behavior */
        utility2.onEventErrorDefault(error);
        /* test error.message handling behavior */
        error.stack = '';
        utility2.onEventErrorDefault(error);
        /* test null error.message and null error.stack handling behavior */
        error.message = '';
        utility2.onEventErrorDefault(error);
        onEventError();
      });
    },

    _onEventErrorDefault_ignore_test: function (onEventError) {
      /*
        this function tests onEventErrorDefault's ignore handling behavior
      */
      var error;
      error = new Error(utility2.uuid4());
      /* add extraneous error message for code coverage */
      state.onEventErrorDefaultIgnoreList.push(utility2.uuid4());
      state.onEventErrorDefaultIgnoreList.push(error.message);
      utility2.onEventErrorDefault(error);
      /* remove extraneous error message */
      state.onEventErrorDefaultIgnoreList.pop();
      onEventError();
    },

    onEventTimeout: function (onEventError, timeout, message) {
      /*
        this function sets a timer to throw and handle a timeout error
      */
      var error;
      error = new Error('onEventTimeout - timeout error - ' + timeout + ' ms - ' + message);
      error.code = 'ETIMEDOUT';
      return setTimeout(function () {
        onEventError(error);
      }, timeout);
    },

    _onEventTimeout_timeout_test: function (onEventError) {
      /*
        this function tests onEventTimeout's timeout handling behavior
      */
      var time;
      time = Date.now();
      utility2.onEventTimeout(function (error) {
        utility2.tryCatch(function () {
          /* assert error occurred */
          utility2.assert(error instanceof Error);
          /* assert error is timeout error */
          utility2.assert(error.code === 'ETIMEDOUT');
          time = Date.now() - time;
          /* assert time passed is greater than timeout */
          /* bug - ie and opera may timeout slightly earlier, so increase the timeout */
          utility2.assert(1.5 * time >= 1000, time);
          onEventError();
        }, onEventError);
      }, 1000, '_onEventTimeout_timeoutError_test');
    },

    scriptLint: function (file, script) {
      /*
        this function lints css / html / js / json scripts
      */
      var result;
      switch (required.path.extname(file)) {
      /* lint css file */
      case '.css':
        result = required.csslint
          && required.csslint.getFormatter('text').formatResults(required.csslint.verify(
            script,
            { ignore: 'ids' }
          ), file, { quiet: true }).trim();
        if (result) {
          console.error('\n_scriptLintCss\n' + result + '\n');
        }
        break;
      /* lint js file */
      case '.js':
      case '.json':
        if (!global.__coverage__ && required.jslint && !required.jslint(script)) {
          console.error('\n_scriptLintJs\n' + required.colors.bold(file));
          required.jslint.errors.forEach(function (error, ii) {
            result = '#' + String(ii + 1) + ' ';
            while (result.length < 4) {
              result = ' ' + result;
            }
            if (error && error.evidence) {
              console.error(result + required.colors.yellow(error.reason)
                + '\n    ' + (error.evidence).trim() + required.colors.grey(' \/\/ Line '
                  + error.line + ', Pos ' + error.character));
            }
          });
          console.error();
        }
        break;
      }
      return script;
    },

    _scriptLint_default_test: function (onEventError) {
      /*
        this function tests scriptLint's error handling behavior
      */
      utility2.testMock(onEventError, [
        [console, { error: utility2.nop }],
        [global, { __coverage__: null }]
      ], function (onEventError) {
        /* test css default handling behavior */
        utility2.scriptLint('_scriptLint_default_test.css', '_scriptLint_default_test {}');
        /* test css error handling behavior */
        utility2.scriptLint('_scriptLint_default_test.css', '_scriptLint_default_test');
        /* test js default handling behavior */
        utility2.scriptLint('_scriptLint_default_test.js', '_scriptLint_default_test');
        /* test js error handling behavior */
        utility2.scriptLint('_scriptLint_default_test.js', 'var aa = "bb";');
        /* test js error.evidence missing handling behavior */
        utility2.testMock(onEventError, [
          [required, { jslint: function () {
            required.jslint.errors = [null];
          } }]
        ], function () {
          utility2.scriptLint('_scriptLint_default_test.js', 'var aa = "bb";');
        });
        onEventError();
      });
    },

    scriptMinify: function (file, script) {
      /*
        this function minifies css / js scripts
      */
      var ast, result;
      switch (required.path.extname(file)) {
      /* minify css file */
      case '.css':
        script = required.cssmin ? required.cssmin(script) : script;
        break;
      /* minify js file */
      case '.js':
        if (required.uglifyjs) {
          ast = required.uglifyjs.parse(script, { filename: file });
          /* figure out scope */
          ast.figure_out_scope();
          /* compress */
          ast.transform(new required.uglifyjs.Compressor());
          /* mangle */
          ast.figure_out_scope();
          ast.compute_char_frequency();
          ast.mangle_names();
          /* create output */
          result = new required.uglifyjs.OutputStream({ ascii_only: true });
          ast.print(result);
          script = result.toString();
        }
        break;
      }
      return script;
    },

    _scriptMinify_default_test: function (onEventError) {
      /*
        this function tests scriptMinify's defult handling behavior
      */
      utility2.scriptMinify('foo.css', '_scriptMinify_default_test {}');
      utility2.scriptMinify('foo.js', 'console.log("_scriptMinify_default_test");');
      onEventError();
    },

    setDefault: function (options, defaults) {
      /*
        this function recursively walks through the defaults object,
        and uses it to set default values for unset leaf nodes in the options object
      */
      Object.keys(defaults).forEach(function (key) {
        var defaults2, options2;
        defaults2 = defaults[key];
        options2 = options[key];
        /* set default value */
        if (options2 === undefined) {
          options[key] = defaults2;
          return;
        }
        /* recurse defaults2 if options2 and defaults2 are both objects */
        if (defaults2 && typeof defaults2 === 'object'
            && options2 && typeof options2 === 'object'
            && !Array.isArray(options2)) {
          local.setDefault(options2, defaults2);
        }
      });
      return options;
    },

    _setDefault_default_test: function (onEventError) {
      /*
        this function tests setDefault's default handling behavior
      */
      var options;
      options = utility2.setDefault(
        { aa: 1, bb: {}, cc: [] },
        { aa: 2, bb: { cc: 2 }, cc: [1, 2] }
      );
      utility2.assert(
        utility2.jsonStringifyOrdered(options) === '{"aa":1,"bb":{"cc":2},"cc":[]}',
        options
      );
      onEventError();
    },

    setOverride: function (state, override, backup, depth) {
      /*
        this function recursively overrides the state object with the override object,
        and optionally saves the original state object to the backup object,
        and optionally accepts the depth recursion limit
      */
      local._setOverrideRecurse(state, override, backup || {}, depth || Infinity);
      return state;
    },

    _setOverrideRecurse: function (state, override, backup, depth) {
      /*
        this function
        1. save the state item to the backup object
        2. set the override item to the state object
        3. recurse the override object
      */
      var state2, override2;
      Object.keys(override).forEach(function (key) {
        state2 = state[key];
        override2 = backup[key] = override[key];
        if (depth <= 1
            /* override2 is not a plain object */
            || !(override2 && typeof override2 === 'object' && !Array.isArray(override2))
            /* state2 is not a plain object */
            || !(state2 && typeof state2 === 'object' && !Array.isArray(state2))) {
          /* 1. save the state item to the backup object */
          backup[key] = state2;
          /* 2. set the override item to the state object */
          state[key] = override2;
          return;
        }
        /* 3. recurse the override object */
        local._setOverrideRecurse(state2, override2, override2, depth - 1);
      });
    },

    _setOverride_default_test: function (onEventError) {
      /*
        this function tests setOverride's default handling behavior
      */
      var backup, state;
      backup = {};
      /* test override */
      state = utility2.setOverride(
        { aa: 1, bb: { cc: 2 }, dd: [3, 4], ee: { ff: { gg: 5, hh: 6 } } },
        { aa: 2, bb: { dd: 3 }, dd: [4, 5], ee: { ff: { gg: 6 } } },
        backup,
        2
      );
      utility2.assert(utility2.jsonStringifyOrdered(state)
          === '{"aa":2,"bb":{"cc":2,"dd":3},"dd":[4,5],"ee":{"ff":{"gg":6}}}', state);
      /* test backup */
      utility2.assert(utility2.jsonStringifyOrdered(backup)
          === '{"aa":1,"bb":{},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', backup);
      /* test restore */
      utility2.setOverride(state, backup);
      utility2.assert(utility2.jsonStringifyOrdered(backup)
          === '{"aa":1,"bb":{"dd":3},"dd":[3,4],"ee":{"ff":{"gg":6}}}', backup);
      utility2.assert(utility2.jsonStringifyOrdered(state)
          === '{"aa":1,"bb":{"cc":2},"dd":[3,4],"ee":{"ff":{"gg":5,"hh":6}}}', state);
      onEventError();
    },

    _Test: function () {
      /*
        this is the _Test class
      */
      return;
    },

    _Test_prototype_report: function () {
      /*
        this function creates a test report
      */

      var self, state;
      self = this;
      state = self.global.state;
      utility2.testReportMerge(state.testReport);
      utility2.testReportLog(state.testReport);
      /* record total time for all testPlatforms to run */
      state.testReport.totalTime = utility2.timeElapsed(state.testReport.totalTime);
      /* copy state.testReport */
      state.testReportCopy = utility2.jsonCopy(state.testReport);
      /* reset state.testReport */
      state.testReport = utility2.testReportMerge({});
      /* browser code */
      if (state.modeBrowser) {
        /* notify saucelabs of test results */
        self.global.global_test_results = {
          coverage: global.__coverage__,
          testCallbackId: state.testCallbackId,
          testReport: state.testReportCopy,
          /* extra stuff to keep saucelabs happy - https://saucelabs.com/docs/rest#jsunit */
          failed: state.testReportCopy.testsFailed,
          passed: state.testReportCopy.testsPassed
        };
        if (utility2.urlParamsGet(self.global.location.hash, '#').testReportUpload) {
          utility2.ajax({
            data: JSON.stringify(self.global.global_test_results),
            url: '/test/testReportUpload?userAgent='
              + encodeURIComponent(self.global.navigator.userAgent)
          }, function (error) {
            utility2.onEventErrorDefault(error);
          });
        }
        /* update state.testReportDiv in browser */
        state.testReportDiv.innerHTML = utility2.testReportHtml(state.testReportCopy);
        utility2.clearCallSetInterval('testReportDivUpdate', 'clear');
      }
      /* nodejs code */
      if (state.modeNodejs) {
        /* wait for any async jobs to finish before reporting test results */
        setTimeout(function () {
          utility2.testReportNodejs(state.testReportCopy);
        }, 100);
      }
    },

    __Test_prototype_report_testsFailed_test: function (onEventError) {
      /*
        this function tests _Test_prototype_report's tests failed handling behavior
      */
      utility2.testMock(onEventError, [
        [utility2, {
          ajax: utility2.callArg1,
          clearCallSetInterval: utility2.nop,
          onEventErrorDefault: null
        }]
      ], function (onEventError) {
        var self;
        self = local._createTest({
          location: { hash: '' },
          navigator: {},
          state: {
            /* test browser mode handling behavior */
            modeBrowser: true,
            /* test multiple test platforms handling behavior */
            testReport: utility2.testReportMerge({ testPlatformList: [
              /* test tests failed handling behavior */
              { name: 'bb', testCaseList: [{ errorMessage: 'error' }] },
              { name: 'aa', testCaseList: [{ errorMessage: 'error' }] }
            ] }),
            /* test state.testReportDiv handling behavior */
            testReportDiv: {}
          }
        });
        /* test report upload disabled handling behavior */
        self.report();
        /* test report upload handling behavior */
        self.global.location.hash = '#testReportUpload=1';
        utility2.onEventErrorDefault = onEventError;
        self.report();
      });
    },

    _Test_prototype_run: function () {
      /*
        this function runs all tests for a given module
      */
      var self, state, testPlatform;
      self = this;
      state = self.global.state;
      /* create user agent test group */
      testPlatform = utility2.userAgent();
      state.testReport.testPlatformList.forEach(function (value) {
        if (value.name === testPlatform) {
          testPlatform = value;
        }
      });
      if (typeof testPlatform !== 'object') {
        testPlatform = {
          name: testPlatform,
          testCaseList: [],
          totalTime: Date.now()
        };
        state.testReport.testPlatformList.push(testPlatform);
        state.testReport.onEventReady.remaining += 1;
      }
      /* init testPlatform.onEventReady */
      testPlatform.onEventReady = testPlatform.onEventReady || utility2.untilReady(function () {
        /* record time for testPlatform to run */
        testPlatform.totalTime = utility2.timeElapsed(testPlatform.totalTime);
        state.testReport.onEventReady();
      });
      /* handle null case where there are no test cases to run */
      testPlatform.onEventReady.remaining += 1;
      self.global.setTimeout(testPlatform.onEventReady);
      /* loop through all tests in local2 */
      Object.keys(self.local2).forEach(function (testCase) {
        if (testCase.slice(-5) === '_test') {
          testPlatform.onEventReady.remaining += 1;
          testCase = {
            errorMessage: '',
            module: self.local2._name,
            name: testCase,
            time: Date.now()
          };
          testPlatform.testCaseList.push(testCase);
          self.runTestCase(testCase, testPlatform);
        }
      });
    },

    __Test_prototype_run_testsFailed_test: function (onEventError) {
      /*
        this function tests _Test_prototype_run's tests failed handling behavior
      */
      var self, data;
      self = local._createTest({
        console: { error: utility2.nop },
        setTimeout: utility2.callArg0,
        state: { testModuleDict: {}, testReport: utility2.testReportMerge({
          onEventReady: utility2.nop,
          testPlatformList: [{ testCaseList: [] }]
        }) }
      }, {
        _name: 'utility2.__Test_prototype_run_testsFailed_test',
        _test: function (onEventError) {
          state.onEventErrorDefaultIgnoreList.push('utility2 error');
          state.onEventErrorDefaultIgnoreList.push('runTestCase - ' + utility2.userAgent()
            + ' - utility2.__Test_prototype_run_testsFailed_test._test\'s'
            + ' callback called multiple times');
          /* test tests failed handling behavior */
          onEventError(utility2.error);
          /* test multiple callback error handling behavior */
          onEventError();
        }
      });
      self.run();
      data = self.global.state.testReport.testPlatformList[1].testCaseList[0].errorMessage;
      utility2.assert(data, data);
      onEventError();
    },

    __Test_prototype_run_testsSkipped_test: function (onEventError) {
      /*
        this function tests _Test_prototype_run's tests skipped handling behavior
      */
      var self, data;
      self = local._createTest({
        console: { error: utility2.nop },
        setTimeout: utility2.callArg0,
        state: {
          testModuleDict: { 'utility2.__Test_prototype_run_testsSkipped_test': false },
          testReport: utility2.testReportMerge({
            onEventReady: utility2.nop
          })
        }
      }, {
        _name: 'utility2.__Test_prototype_run_testsSkipped_test',
        _test: utility2.callArg0
      });
      self.run();
      data = self.global.state.testReport.testPlatformList[0].testCaseList[0].status;
      utility2.assert(data === 'skipped', data);
      onEventError();
    },

    _Test_prototype_runTestCase: function (testCase, testPlatform) {
      /*
        this function creates a testCase object from the given testName
        and runs it asynchronously
      */
      var errorMessage, name, onEventError2, remaining, self, state, timeout;
      self = this;
      state = self.global.state;
      /* handle testCase result */
      onEventError2 = function (error) {
        /* clear timeout for testCase */
        clearTimeout(timeout);
        name = testPlatform.name + ' - ' + testCase.module + '.' + testCase.name;
        /* assert testCase callback was not called multiple times */
        remaining -= 1;
        if (remaining < 0) {
          error = error || new Error(
            'runTestCase - ' + name + "'s callback called multiple times"
          );
        }
        /* testCase failed */
        if (error) {
          /* save error message */
          errorMessage = 'runTestCase - failed - ' + name;
          self.global.console.error(required.colors.inverse('\n' + errorMessage));
          utility2.onEventErrorDefault(error);
          errorMessage += state.debugMessage;
          testCase.errorMessage = errorMessage;
          state.testReport.errorMessageList.push(errorMessage);
          if (remaining < 0) {
            return;
          }
        }
        /* record time for testCase to run */
        testCase.time = utility2.timeElapsed(testCase.time);
        /* finish testCase */
        testPlatform.onEventReady();
      };
      remaining = 1;
      /* set timeout for testCase */
      timeout = utility2.onEventTimeout(
        onEventError2,
        /* slightly increase timeout to allow for individual test timeouts */
        1.0625 * state.timeoutDefault,
        'runTestCase'
      );
      utility2.tryCatch(function () {
        /* skip testCase */
        if (state.testModuleDict[testCase.module] === false) {
          testCase.status = 'skipped';
          testCase.time = 0;
          onEventError2();
          return;
        }
        /* run testCase */
        self.local2[testCase.name](onEventError2);
        /* catch synchronously thrown errors */
      }, onEventError2);
    },

    testMock: function (onEventError, mockList, test) {
      /*
        this function mocks the state given in the mockList while running the test callback
      */
      var onEventError2;
      /* prepend mandatory mocks for async / unsafe functions */
      mockList = [
        /* suppress console.log */
        [console, { log: utility2.nop }],
        /* enforce synchonicity by mocking timers as utility2.callArg0 */
        [global, { setInterval: utility2.callArg0, setTimeout: utility2.callArg0 }],
        [global.process || {}, { exit: utility2.throwError }],
        [utility2, { shell: utility2.throwError }]
      ].concat(mockList);
      onEventError2 = function (error) {
        /* restore state */
        mockList.reverse().forEach(function (mock) {
          utility2.setOverride(mock[0], mock[2], null, 1);
        });
        if (error) {
          onEventError(error);
        }
      };
      /* run onEventError callback in mocked state in a try catch block */
      utility2.tryCatch(function () {
        /* mock state */
        mockList.forEach(function (mock) {
          mock[2] = {};
          utility2.setOverride(mock[0], mock[1], mock[2], 1);
        });
        /* run test */
        test(onEventError);
        onEventError2();
      }, onEventError2);
    },

    _testMock_error_test: function (onEventError) {
      /*
        this function tests testMock's error handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { aa: 1 } }]
      ], function (onEventError) {
        utility2.testMock(function (error) {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          utility2.assert(state.aa === 1, state);
          onEventError();
        }, [
          [state, { aa: 2 }]
        ], function () {
          throw utility2.error;
        });
      });
    },

    testReportHtml: function (testReport) {
      /*
        this function creates an html test report
      */
      var errorMessageList, processEnv, testCaseNumber;
      processEnv = (global.process && process.env) || {};
      testCaseNumber = 0;
      testReport = utility2.jsonCopy(utility2.testReportMerge(testReport));
      return utility2.textFormat(
        state.fsWatchDict['/public/utility2/testReport.html.template'].contentBrowser,
        utility2.setOverride(testReport, {
          CI_BUILD_NUMBER: processEnv.CI_BUILD_NUMBER,
          /* security - sanitize '<' in text */
          CI_COMMIT_INFO: String(processEnv.CI_COMMIT_INFO).replace((/</g), '&lt;'),
          GITHUB_REPO_URL: processEnv.GITHUB_REPO_URL,
          GITHUB_REPO_URL_HREF: processEnv.GITHUB_REPO_URL || '#',
          /* map testPlatformList */
          testPlatformList: testReport.testPlatformList.map(function (testPlatform, ii) {
            errorMessageList = [];
            return utility2.setOverride(testPlatform, {
              errorMessageList: errorMessageList,
              /* security - sanitize '<' in text */
              name: String(testPlatform.name).replace((/</g), '&lt;'),
              /* map testCaseList */
              testCaseList: testPlatform.testCaseList.map(function (testCase) {
                testCaseNumber += 1;
                if (testCase.errorMessage) {
                  /* word wrap error message 128 characters in pre tag */
                  errorMessageList.push({ errorMessage: utility2.textWordwrap(testCaseNumber
                    + '. ' + testCase.module + '.' + testCase.name + '\n'
                    + testCase.errorMessage, 96)
                      /* security - sanitize '<' in text */
                      .replace((/</g), '&lt;') });
                }
                return utility2.setOverride(testCase, {
                  name: testCase.module + '.' + testCase.name,
                  testCaseNumber: testCaseNumber,
                  testReportTestStatusClass: 'testReportTest'
                    + testCase.status[0].toUpperCase() + testCase.status.slice(1),
                  time: utility2.timeElapsed(testCase.time)
                });
              }),
              testReportPlatformPreClass: 'testReportPlatformPre'
                + (errorMessageList.length ? '' : 'Hidden'),
              testPlatformNumber: ii + 1,
              totalTime: utility2.timeElapsed(testPlatform.totalTime)
            });
          }),
          testsFailedClass: testReport.testsFailed
            ? 'testReportTestFailed'
            : 'testReportTestPassed',
          testsSkippedClass: testReport.testsSkipped
            ? 'testReportTestSkipped'
            : 'testReportTestPassed',
          totalTime: utility2.timeElapsed(testReport.totalTime)
        })
      );
    },

    _testReportHtml_default_test: function (onEventError) {
      /*
        this function tests testReportHtml's default handling behavior
      */
      var data;
      data = utility2.testReportHtml({
        testPlatformList: [{ testCaseList: [
          /* test test failed handling behavior */
          { errorMessage: 'error' },
          /* test test passed handling behavior */
          { time: 0 },
          /* test test pending handling behavior */
          { time: Date.now() },
          /* test test skipped handling behavior */
          { status: 'skipped' }
        ] }]
      });
      /* assert test failed */
      utility2.assert(data.indexOf('<td class="testReportTestFailed">1</td>') >= 0, data);
      /* assert test passed */
      utility2.assert(data.indexOf('<td class="testReportTestPassed">1</td>') >= 0, data);
      /* assert test skipped */
      utility2.assert(data.indexOf('<td class="testReportTestSkipped">1</td>') >= 0, data);
      onEventError();
    },

    testReportLog: function (testReport) {
      /*
        this function prints a human-readable summary of the testReport
      */
      var result;
      result = '\n\n\ntest report - ' + utility2.userAgent() + '\n';
      /* merge testReport */
      testReport.testPlatformList.forEach(function (testPlatform) {
        result += (testPlatform.testsFailed ? required.colors.inverse : utility2.echo)(
          ('        ' + testPlatform.totalTime).slice(-8) + ' ms | '
            + (' ' + testPlatform.testsFailed).slice(-2) + ' failed | '
            + (' ' + testPlatform.testsSkipped).slice(-2) + ' skipped | '
            + ('  ' + testPlatform.testsPassed).slice(-3) + ' passed in '
            + testPlatform.name + '\n'
        );
      });
      result += '\n' + testReport.errorMessageList.join('\n') + '\n';
      utility2.jsonLog(result);
    },

    testReportMerge: function (testReport1, testReport2) {
      /*
        this function merges testReport2 into testReport1
      */
      var testPlatform1;
      utility2.assert(
        testReport1 && typeof testReport1 === 'object',
        'invalid testReport1 ' + typeof testReport1
      );
      testReport1 = utility2.setDefault(testReport1, {
        errorMessageList: [],
        testPlatformList: [],
        totalTime: 0
      });
      testReport2 = testReport2 || {};
      (testReport2.errorMessageList || []).forEach(function (errorMessage) {
        testReport1.errorMessageList.push(String(errorMessage));
      });
      (testReport2.testPlatformList || []).forEach(function (testPlatform2) {
        testPlatform1 = null;
        /* security - fix potentially malformed testPlatform2 */
        testPlatform2 = testPlatform2 || {};
        testPlatform2.name = String(testPlatform2.name);
        testPlatform2.totalTime = Number(testPlatform2.totalTime) || 0;
        testReport1.testPlatformList.forEach(function (_) {
          /* use existing testPlatform1 */
          if (_.name === testPlatform2.name) {
            testPlatform1 = _;
          }
        });
        /* crate new testPlatform1 */
        if (!testPlatform1) {
          testPlatform1 = {
            name: testPlatform2.name,
            testCaseList: [],
            totalTime: 0
          };
          testReport1.testPlatformList.push(testPlatform1);
        }
        /* merge testPlatform2 into testPlatform1 */
        testPlatform1.totalTime += testPlatform2.totalTime;
        /* merge testPlatform2.testCaseList into testPlatform1.testCaseList */
        if (Array.isArray(testPlatform2.testCaseList)) {
          testPlatform2.testCaseList.forEach(function (testCase) {
            /* security - fix potentially malformed testCase */
            testCase.errorMessage = String(testCase.errorMessage || '');
            testCase.module = String(testCase.module);
            testCase.name = String(testCase.name);
            testCase.time = Number(testCase.time) || 0;
            testPlatform1.testCaseList.push(testCase);
          });
        }
      });
      /* update date */
      testReport1.date = testReport1.date || new Date().toISOString();
      /* update totalTime */
      if (testReport1.totalTime < 0xffffffff) {
        testReport1.totalTime += Number(testReport2.totalTime) || 0;
      }
      testReport1.platformsFailed = 0;
      testReport1.platformsPassed = 0;
      testReport1.testsFailed = 0;
      testReport1.testsPassed = 0;
      testReport1.testsPending = 0;
      testReport1.testsSkipped = 0;
      testReport1.testPlatformList.forEach(function (testPlatform1) {
        testPlatform1.status = 'passed';
        testPlatform1.testsFailed = 0;
        testPlatform1.testsPassed = 0;
        testPlatform1.testsSkipped = 0;
        testPlatform1.testCaseList.forEach(function (testCase) {
          /* update tests skipped */
          if (testCase.status === 'skipped') {
            testReport1.testsSkipped += 1;
            testPlatform1.testsSkipped += 1;
          /* update tests failed */
          } else if (testCase.errorMessage) {
            testCase.status = 'failed';
            testReport1.testsFailed += 1;
            testPlatform1.testsFailed += 1;
            testPlatform1.status = 'failed';
          /* update tests pending */
          } else if (testCase.time > 0xffffffff) {
            testCase.status = 'pending';
            testReport1.testsPending += 1;
            if (testPlatform1.status !== 'failed') {
              testPlatform1.status = 'pending';
            }
          /* update tests passed */
          } else {
            testCase.status = 'passed';
            testReport1.testsPassed += 1;
            testPlatform1.testsPassed += 1;
          }
        });
        switch (testPlatform1.status) {
        case 'failed':
          /* update platforms failed */
          testReport1.platformsFailed += 1;
          break;
        case 'passed':
          /* update platforms passed */
          testReport1.platformsPassed += 1;
          break;
        }
        /* sort testCaseList by status.module.name */
        testPlatform1.testCaseList.sort(function (arg1, arg2) {
          arg1 = String(arg1.status.replace('passed', 'z') + arg1.module + arg1.name)
            .toLowerCase();
          arg2 = String(arg2.status.replace('passed', 'z') + arg2.module + arg2.name)
            .toLowerCase();
          return arg1 <= arg2 ? -1 : 1;
        });
      });
      /* sort testPlatformList by status.name */
      testReport1.testPlatformList.sort(function (arg1, arg2) {
        arg1 = String(arg1.status.replace('passed', 'z') + arg1.name).toLowerCase();
        arg2 = String(arg2.status.replace('passed', 'z') + arg2.name).toLowerCase();
        return arg1 <= arg2 ? -1 : 1;
      });
      return testReport1;
    },

    _testReportMerge_malformedData_test: function (onEventError) {
      /*
        this funciton tests testReportMerge's malformed data handling behavior
      */
      utility2.testReportMerge({
        errorMessageList: [],
        testPlatformList: [{ name: 'aa', testCaseList: [] }]
      }, {
        errorMessageList: [null],
        testPlatformList: [null, { name: 'aa' }]
      });
      onEventError();
    },

    timeElapsed: function (time) {
      /*
        this function calculates the time elapsed from present if not already set
      */
      time = time < 0xffffffff ? time : Date.now() - time;
      return time || 0;
    },

    /* ascii character reference */
    textExampleAscii: '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f'
      + '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f'
      + ' !"#$%&\'()*+,-./0123456789:;<=>?'
      + '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'
      + '`abcdefghijklmnopqrstuvwxyz{|}~\x7f',

    /* require('crypto').createHash('sha1').update(new Buffer(0)).digest('hex') */
    textExampleSha1: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',

    /* utility2.uuid4() */
    textExampleUuid4: 'aaaaaaaa-aaaa-4aaa-baaa-aaaaaaaaaaaa',

    /* new Buffer(utility2.textExampleAscii).toString('base64') */
    textExampleBase64: 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwd'
      + 'Hh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7'
      + 'PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZ'
      + 'WltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3'
      + 'eHl6e3x9fn8=',

    textFormat: function (template, dict) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var value;
      dict = dict || {};
      /* search for keys in the template */
      return local._textFormatList(template, dict).replace((/\{\{[^{}]+\}\}/g), function (key) {
        /* lookup key's value in the dict */
        value = key.slice(2, -2);
        return dict.hasOwnProperty(value) ? dict[value] : key;
      });
    },

    _textFormat_default_test: function (onEventError) {
      /*
        this function tests textFormat's default handling behavior
      */
      var data;
      data = utility2.textFormat('{{aa}}{{aa}}{{bb}}{{bb}}{{cc}}{{cc}}', {
        /* test string handling behavior */
        aa: 'aa',
        /* test non-string handling behavior */
        bb: undefined
      });
      utility2.assert(data === 'aaaaundefinedundefined{{cc}}{{cc}}', data);
      /* test list handling behavior */
      data = utility2.textFormat('[{{@list1}}[{{@list2}}{{aa}},{{/@list2}}],{{/@list1}}]', {
        list1: [
          /* test null handling behavior */
          null,
          /* test recursive list handling behavior */
          { list2: [{ aa: 'bb' }, { aa: 'cc' }] }
        ]
      });
      utility2.assert(data === '[[{{@list2}}{{aa}},{{/@list2}}],[bb,cc,],]', data);
      onEventError();
    },

    _textFormatList: function (template, dict) {
      /*
        this function replaces the keys in given text template
        with the key / value pairs provided by the dict
      */
      var rgx, match, onEventReplace;
      onEventReplace = function (_, fragment) {
        utility2.nop(_);
        return dict[match].map(function (dict) {
          return utility2.textFormat(fragment, dict);
        }).join('');
      };
      rgx = (/\{\{@[^{]+\}\}/g);
      while (true) {
        /* search for array keys in the template */
        match = rgx.exec(template);
        if (!match) {
          break;
        }
        /* lookup key's value in the dict */
        match = match[0].slice(3, -2);
        if (Array.isArray(dict[match])) {
          template = template.replace(
            new RegExp('\\{\\{@' + match + '\\}\\}([\\S\\s]*?)\\{\\{\\/@' + match + '\\}\\}'),
            onEventReplace
          );
        }
      }
      return template;
    },

    textWordwrap: function (text, width) {
      /*
        this function word wraps the text to the specified width
      */
      width -= 1;
      return text.split('\n').map(function (line) {
        for (text = [line]; line.length > width + 1; line = text[text.length - 1]) {
          line = [line.slice(0, width) + '\\', '        ' + line.slice(width)];
          text.splice(text.length - 1, 1, line[0], line[1]);
        }
        return text.join('\n');
      }).join('\n');
    },

    _textWordwrap_default_test: function (onEventError) {
      /*
        this function tests textWordwrap's default handling behavior
      */
      utility2.textWordwrap(utility2.textExampleAscii, 80).split('\n').forEach(function (line) {
        /* assert line is 80 characters or less */
        utility2.assert(line.length <= 80, line.length);
      });
      onEventError();
    },

    throwError: function () {
      /*
        this function always throws an error
      */
      throw utility2.error;
    },

    _throwError_default_test: function (onEventError) {
      /*
        this function tests throwError's default handling behavior
      */
      utility2.tryCatch(utility2.throwError, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
        onEventError();
      }, onEventError);
    },

    tryCatch: function (callback, onEventError) {
      /*
        this function calls the callback in a try catch block,
        and falls back to onEventError if an error is thrown
      */
      try {
        callback();
      } catch (error) {
        onEventError(error);
      }
    },

    tryCatchHandler: function (onEventError) {
      /*
        this function returns a callback that will call onEventError in a try catch block
      */
      return function (error, data) {
        if (error) {
          onEventError(error);
          return;
        }
        try {
          onEventError(null, data);
        } catch (error2) {
          onEventError(error2);
        }
      };
    },

    unref: function (obj) {
      /*
        this function unref's the object under nodejs
      */
      if (obj && obj.unref) {
        obj.unref();
      }
      return obj;
    },

    untilReady: function (onEventError) {
      /*
        this function defers the onEventError callback until the remaining counter goes to zero
      */
      var self;
      self = function (error) {
        /* save any errors encountered */
        self.error = self.error || error;
        self.remaining -= 1;
        if (self.remaining === 0) {
          onEventError(self.error);
        }
        /* assert remaining >= 0 */
        utility2.assert(self.remaining >= 0, 'invalid self.remaining ' + self.remaining);
      };
      self.remaining = 0;
      return self;
    },

    _untilReady_error_test: function (onEventError) {
      /*
        this function tests untilReady's error handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
      });
      onEventReady.remaining += 1;
      /* test error handling behavior */
      onEventReady(utility2.error);
      /* test multiple callback error handling behavior */
      utility2.tryCatch(onEventReady, function (error) {
        /* assert error occurred */
        utility2.assert(error instanceof Error, error);
        onEventError();
      });
    },

    urlDecodeOrError: function (text) {
      /*
        this function returns an error if the text cannot be decoded
      */
      try {
        return decodeURIComponent(text);
      } catch (error) {
        return error;
      }
    },

    _urlDecodeOrError_error_test: function (onEventError) {
      /*
        this function tests urlDecodeOrError's error handling behavior
      */
      var data;
      data = utility2.urlDecodeOrError(utility2.textExampleAscii);
      utility2.assert(data instanceof Error, data);
      onEventError();
    },

    urlParamsGet: function (url, delimiter) {
      /*
        this function returns a dictionary containing the url hash / search params
      */
      var params;
      params = {};
      url = required.url.parse(url);
      url = delimiter === '#' ? url.hash : url.search;
      (url || '').slice(1).replace((/([^&]+)=([^&]+)/g), function (_, key, value) {
        utility2.nop(_);
        /* validate key / value */
        key = utility2.urlDecodeOrError(key);
        value = utility2.urlDecodeOrError(value);
        if (!((key instanceof Error) || (value instanceof Error))) {
          params[key] = value;
        }
      });
      return params;
    },

    _urlParamsGet_default_test: function (onEventError) {
      /*
        this function tests urlParamsGet's default handling behavior
      */
      var data;
      data = utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B&ff=%%', '?');
      utility2.assert(utility2.jsonStringifyOrdered(data) === '{"bb":"cc+"}', data);
      data = utility2.urlParamsGet('/aa?bb=cc%2B#dd=ee%2B&ff=%%', '#');
      utility2.assert(utility2.jsonStringifyOrdered(data) === '{"dd":"ee+"}', data);
      onEventError();
    },

    urlParamsMerge: function (url, params, delimiter) {
      /*
        this function merges the url hash / search with the given params
      */
      params = utility2.setOverride(utility2.urlParamsGet(url, delimiter), params);
      params = Object.keys(params).sort().map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
      url = required.url.parse(url);
      return [
        url.protocol ? url.protocol + '//' : '',
        url.host,
        url.pathname,
        delimiter === '#' ? url.search : '?' + params,
        delimiter === '#' ? '#' + params : url.hash
      ].map(function (arg) {
        return arg || '';
      }).join('');
    },

    _urlParamsMerge_default_test: function (onEventError) {
      /*
        this function tests urlParamsMerge's default handling behavior
      */
      var data;
      data = utility2.urlParamsMerge('http://localhost/aa#dd=ee%2B', { bb: 'cc+' }, '?');
      utility2.assert(data === 'http://localhost/aa?bb=cc%2B#dd=ee%2B', data);
      data = utility2.urlParamsMerge('/aa#dd=ee%2B', { bb: 'cc+' }, '?');
      utility2.assert(data === '/aa?bb=cc%2B#dd=ee%2B', data);
      data = utility2.urlParamsMerge('/aa?bb=cc%2B', { dd: 'ee+' }, '#');
      utility2.assert(data === '/aa?bb=cc%2B#dd=ee%2B', data);
      onEventError();
    },

    urlParamsRemove: function (url, keyList, delimiter) {
      /*
        this function removes the given keys from the url hash / search params
      */
      var params;
      params = utility2.urlParamsGet(url, delimiter);
      keyList.forEach(function (key) {
        delete params[key];
      });
      return utility2.urlParamsMerge(
        url.replace(delimiter === '#' ? (/#.*/) : (/\?[^#]*/), ''),
        params,
        delimiter
      );
    },

    _urlParamsRemove_default_test: function (onEventError) {
      /*
        this function tests urlParamsRemove's default handling behavior
      */
      var data;
      data = utility2.urlParamsRemove('/aa?bb=cc%2B#dd=ee%2B', ['bb'], '?');
      utility2.assert(data === '/aa?#dd=ee%2B', data);
      data = utility2.urlParamsRemove('/aa?bb=cc%2B#dd=ee%2B', ['dd'], '#');
      utility2.assert(data === '/aa?bb=cc%2B#', data);
      onEventError();
    },

    userAgent: function () {
      /*
        this function returns the current javascript platform's user agent
      */
      return state.modeNodejs
        ? 'nodejs - ' + (global.process && (process.platform + ' ' + process.version))
          + ' - ' + (global.process && process.env && process.env.MODE_CI_BUILD)
        : 'browser - ' + (global.navigator && navigator.userAgent);
    },

    _userAgent_default_test: function (onEventError) {
      /*
        this function tests userAgent's default handling behavior
      */
      utility2.testMock(onEventError, [
        [global, { state: { modeNodejs: null, modeBrowser: null } }]
      ], function (onEventError) {
        var data;
        /* test nodejs mode handling behavior */
        state.modeBrowser = false;
        state.modeNodejs = true;
        data = utility2.userAgent();
        utility2.assert((/^nodejs - /).test(data), data);
        /* test browser mode handling behavior */
        state.modeBrowser = true;
        state.modeNodejs = false;
        data = utility2.userAgent();
        utility2.assert((/^browser - /).test(data), data);
        onEventError();
      });
    },

    uuid4: function () {
      /*
        this function returns a uuid4 string of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      */
      /*jslint bitwise: true*/
      var id, ii;
      id = '';
      for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
        case 8:
        case 20:
          id += '-';
          id += (Math.random() * 16 | 0).toString(16);
          break;
        case 12:
          id += '-';
          id += '4';
          break;
        case 16:
          id += '-';
          id += (Math.random() * 4 | 8).toString(16);
          break;
        default:
          id += (Math.random() * 16 | 0).toString(16);
        }
      }
      return id;
    }

  };
  local._init();
}());























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































(function moduleAjaxBrowser() {
  /*
    this browser module exports the ajax api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAjaxBrowser',

    _init: function () {
      if (state.modeBrowser) {
        utility2.initLocal(local);
      }
    },

    _initOnce: function () {
      /* init ajaxProgressDiv element */
      local._initOnceAjaxProgressDiv(global, local);
      local._ajaxProgressDiv.innerHTML = '<div class="ajaxProgressBarDiv'
        + ' ajaxProgressBarDivLoading">loading</div>';
      /* init ajaxProgressBarDiv element */
      local._ajaxProgressBarDiv = local._ajaxProgressDiv
        .getElementsByClassName('ajaxProgressBarDiv')[0];
      /* reset progres bar */
      local._ajaxProgressHide();
      /* abort all pending ajax request on click event */
      local._ajaxProgressDiv.addEventListener('click', local._ajaxProgressAbort);
      /* create global setInterval to check ajax progress */
      /* and hide the progress bar if necessary */
      utility2.clearCallSetInterval('ajaxProgressDivHide', function () {
        if (local._ajaxProgressList.length === 0
            && local._ajaxProgressDiv.style.display !== 'none') {
          /* display progress status for a short time before hiding */
          setTimeout(local._ajaxProgressHide, 1000);
        }
      }, 1000);
    },

    _initOnceAjaxProgressDiv: function (global2, local2) {
      /* init ajaxProgressDiv element */
      local2._ajaxProgressDiv = global2.document.getElementById('ajaxProgressDiv')
        || global2.document.createElement('div');
    },

    _initOnceAjaxProgressDiv_progressDisabled_test: function (onEventError) {
      /*
        this function tests _initOnceAjaxProgressDiv's progress disabled handling behavior
      */
      local._initOnceAjaxProgressDiv({ document: {
        getElementById: utility2.nop,
        createElement: function (data) {
          utility2.assert(data === 'div', data);
          onEventError();
        }
      } }, {});
    },

    ajaxBrowser: function (options, onEventError) {
      /*
        this function implements the the ajax function for the browser
      */
      var data, error, ii, onEventEvent, onEventError2, timeout, xhr;
      /* error handling */
      onEventError2 = function (error, data) {
        if (error) {
          /* add extra debug info to error */
          utility2.ajaxErrorDebug(
            error,
            options.method,
            xhr.status,
            options.url,
            xhr.responseText
          );
        }
        onEventError(error, data);
      };
      /* event handling */
      onEventEvent = function (event) {
        switch (event.type) {
        case 'abort':
        case 'error':
        case 'load':
          /* clear timeout for ajaxBrowser */
          clearTimeout(timeout);
          /* remove xhr from progress list */
          ii = local._ajaxProgressList.indexOf(xhr);
          if (ii >= 0) {
            local._ajaxProgressList.splice(ii, 1);
          }
          if (!error) {
            /* handle abort or error event */
            if (event.type !== 'load' || xhr.status >= 400) {
              error = new Error(event.type);
            /* handle text data */
            } else {
              data = xhr.responseText;
            }
          }
          onEventError2(error, data);
          break;
        }
        /* increment progress bar */
        if (local._ajaxProgressList.length !== 0) {
          local._ajaxProgressIncrement();
          return;
        }
        /* finish progress bar */
        switch (event.type) {
        case 'load':
          local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
          break;
        default:
          local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivError', event.type);
        }
      };
      /* init xhr object */
      xhr = new XMLHttpRequest();
      /* xhr event handling */
      xhr.addEventListener('abort', onEventEvent);
      xhr.addEventListener('error', onEventEvent);
      xhr.addEventListener('load', onEventEvent);
      xhr.addEventListener('loadstart', local._ajaxProgressIncrement);
      xhr.addEventListener('progress', local._ajaxProgressIncrement);
      xhr.upload.addEventListener('progress', local._ajaxProgressIncrement);
      /* set timeout for ajaxBrowser */
      timeout = utility2.onEventTimeout(function (timeout) {
        error = timeout;
        xhr.abort();
      }, state.timeoutDefault, 'ajaxBrowser');
      /* display progress bar if hidden */
      if (local._ajaxProgressList.length === 0) {
        local._ajaxProgressDiv.style.display = 'block';
      }
      local._ajaxProgressList.push(xhr);
      /* open url in xhr */
      xhr.open(options.method, options.url);
      /* send data through xhr */
      xhr.send(options.data);
    },

    _ajaxBrowser_progressAbort_test: function (onEventError) {
      /*
        this function tests ajaxBrowser's progress abort handling behavior
      */
      utility2.testMock(onEventError, [
        [local, { _ajaxProgressList: [] }],
        [global, {
          setTimeout: utility2.nop,
          state: {},
          XMLHttpRequest: function () {
            var self;
            self = this;
            utility2.setOverride(self, {
              addEventListener: function (eventType, onEventEvent) {
                state[eventType] = onEventEvent;
              },
              open: utility2.nop,
              send: utility2.nop,
              upload: { addEventListener: utility2.nop }
            });
          }
        }]
      ], function (onEventError) {
        utility2.ajax({ url: '/test/test.json' }, function (error) {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          onEventError();
        });
        /* test missing xhr handling behavior */
        local._ajaxProgressList.length = 0;
        state.abort({ type: 'abort' });
      });
    },

    _ajaxBrowser_progressFinish_test: function (onEventError) {
      /*
        this function tests ajaxBrowser's progress finish handling behavior
      */
      var intervalId, mode, onEventError2;
      mode = 0;
      onEventError2 = function (error) {
        mode = utility2.modeIncrement(error, mode);
        switch (mode) {
        case 1:
          /* wait for other ajax tests to init first */
          setTimeout(onEventError2);
          break;
        case 2:
          /* set interval */
          intervalId = utility2.uuid4();
          utility2.clearCallSetInterval(
            intervalId,
            utility2.tryCatchHandler(onEventError2),
            2000,
            /* halve timeout to make sure its not blocking other ajax tests */
            0.5 * state.timeoutDefault
          );
          break;
        case 3:
          mode -= 1;
          /* assert no error occurred */
          utility2.assert(!error, error);
          /* wait until progress has successfully finished */
          if (local._ajaxProgressList.length === 0
              && local._ajaxProgressDiv.style.display === 'none') {
            mode += 1;
            onEventError2();
          }
          break;
        default:
          /* clear interval */
          utility2.clearCallSetInterval(intervalId, 'clear');
          onEventError(error);
        }
      };
      onEventError2();
    },

    _ajaxBrowser_timeout_test: function (onEventError) {
      /*
        this function tests ajaxBrowser's timeout handling behavior
      */
      var self;
      utility2.testMock(onEventError, [
        [global, {
          /* mock xhr.abort */
          XMLHttpRequest: function () {
            self = this;
            utility2.setOverride(self, {
              abort: function () {
                self._abort({ type: 'abort' });
              },
              addEventListener: function (event, callback) {
                self['_' + event] = callback;
              },
              open: utility2.nop,
              send: utility2.nop,
              upload: { addEventListener: utility2.nop }
            });
          },
          setTimeout: utility2.callArg0
        }],
        [local, { _ajaxProgressList: [], _ajaxProgressUpdate: utility2.nop }]
      ], function (onEventError) {
        utility2.ajax({ url: '/test/test.json' }, function (error) {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          /* assert error is timeout error */
          utility2.assert(error.code === 'ETIMEDOUT', error.code);
          onEventError();
        });
      });
    },

    _ajaxProgressAbort: function () {
      /*
        this function aborts all pending ajax requests
      */
      while (local._ajaxProgressList.length) {
        local._ajaxProgressList.pop().abort();
      }
    },

    __ajaxProgressAbort_default_test: function (onEventError) {
      /*
        this function tests _ajaxProgressAbort's default handling behavior
      */
      utility2.testMock(onEventError, [
        [local, { _ajaxProgressList: [{}] }]
      ], function (onEventError) {
        local._ajaxProgressList[0].abort = onEventError;
        local._ajaxProgressAbort();
      });
    },

    _ajaxProgressHide: function () {
      /*
        this function hides the progress bar if all ajax request are finished
      */
      if (local._ajaxProgressList.length === 0) {
        /* hide progress bar */
        local._ajaxProgressDiv.style.display = 'none';
        /* reset progress state */
        local._ajaxProgressState = 0;
        local._ajaxProgressUpdate('0%', 'ajaxProgressBarDivLoading', 'loading');
      }
    },

    __ajaxProgressHide_default_test: function (onEventError) {
      /*
        this function tests _ajaxProgressHide's default handling behavior
      */
      utility2.testMock(onEventError, [
        [local, {
          _ajaxProgressDiv: { style: { display: 'block' } },
          _ajaxProgressBarDiv: { className: '', style: {} },
          _ajaxProgressList: [],
          _ajaxProgressState: 0
        }]
      ], function (onEventError) {
        /* test nop handling behavior */
        local._ajaxProgressList.push(null);
        local._ajaxProgressHide();
        utility2.assert(
          local._ajaxProgressDiv.style.display === 'block',
          local._ajaxProgressDiv.style.display
        );
        /* test hide progress bar handling behavior */
        local._ajaxProgressList.length = 0;
        local._ajaxProgressHide();
        utility2.assert(
          local._ajaxProgressDiv.style.display === 'none',
          local._ajaxProgressDiv.style.display
        );
        onEventError();
      });
    },

    _ajaxProgressIncrement: function () {
      /*
        this function increments the progress bar
      */
      /* this algorithm can indefinitely increment the progress bar */
      /* with successively smaller increments without ever reaching 100% */
      local._ajaxProgressState += 1;
      local._ajaxProgressUpdate(
        100 - 75 * Math.exp(-0.125 * local._ajaxProgressState) + '%',
        'ajaxProgressBarDivLoading',
        'loading'
      );
    },

    _ajaxProgressList: [],

    _ajaxProgressUpdate: function (width, type, label) {
      /*
        this function visually updates the progress bar
      */
      local._ajaxProgressBarDiv.style.width = width;
      local._ajaxProgressBarDiv.className = local._ajaxProgressBarDiv.className
        .replace((/ajaxProgressBarDiv\w+/), type);
      local._ajaxProgressBarDiv.innerHTML = label;
    }

  };
  local._init();
}());













































































































































































































































































































































































































































(function moduleAjaxShared() {
  /*
    this shared module exports the ajax api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleAjaxShared',

    _init: function () {
      utility2.initLocal(local);
    },

    ajax: function (options, onEventError) {
      /*
        this function runs the ajax request, and auto-concats the response stream into utf8 text
      */
      /* validate options */
      if (!(options && typeof options.url === 'string')) {
        onEventError(new Error('ajax - invalid options.url ' + (options && options.url)));
        return;
      }
      /* assert callback is a function */
      utility2.assert(
        typeof onEventError === 'function',
        'invalid onEventError ' + typeof onEventError
      );
      /* set options.headers if necessary */
      options.headers = options.headers || {};
      /* set options.url0 if necessary */
      options.url0 = options.url0 || options.url;
      /* set options.method if necessary */
      if (options.data) {
        options.method = options.method || 'POST';
      }
      options.method = options.method || 'GET';
      (state.modeNodejs ? utility2.ajaxNodejs : utility2.ajaxBrowser)(options, onEventError);
    },

    _ajax_default_test: function (onEventError) {
      /*
        this function tests ajax's default handling behavior
      */
      utility2.ajax({ modeDebug: true, url: '/' }, onEventError);
    },

    _ajax_nullCase_test: function (onEventError) {
      /*
        this function tests ajax's null case handling behavior
      */
      utility2.ajax({}, function (error, data) {
        utility2.tryCatch(function () {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          utility2.assert(data === undefined, data);
          onEventError();
        }, onEventError);
      });
    },

    ajaxErrorDebug: function (error, method, statusCode, url, data) {
      /*
        this function add extra ajax debug info to the error's message and stack
      */
      /* add http method / status / url info to error.message */
      error.message = method + ' ' + statusCode + ' - ' + url
        + '\n' + error.message + '\n' + data;
      if (error.stack) {
        /* bug - phantomjs has readonly error.stack */
        utility2.tryCatch(function () {
          error.stack = error.message + '\n' + error.stack;
        }, utility2.nop);
      }
    },

    ajaxMultiUrls: function (options, onEventReady) {
      /*
        this function makes multiple ajax requests for multiple urls
      */
      var remainingList;
      /* validate options.urlList */
      if (!(options
        && Array.isArray(options.urlList)
        && options.urlList.every(function (url) {
            return typeof url === 'string';
          }))) {
        onEventReady(new Error('ajaxMultiUrls - invalid options.urlList '
          + utility2.jsonStringifyCircular(options && options.urlList)));
        return;
      }
      remainingList = utility2.jsonCopy(options.urlList);
      options.urlList.forEach(function (url) {
        var options2;
        options2 = utility2.jsonCopy(options);
        options2.url = url;
        utility2.ajax(options2, function (error, data) {
          /* debug remainingList */
          remainingList.splice(remainingList.indexOf(options2.url0), 1);
          utility2.jsonLog('ajaxMultiUrls - fetched / remaining', [
            options2.url0,
            JSON.stringify(remainingList.slice(0, 2)).replace(']', ',...]')
          ]);
          onEventReady(error, {
            data: data,
            options: options2
          });
        });
      });
    },

    _ajaxMultiUrls_default_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's default handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      onEventReady.remaining += 2;
      utility2.ajaxMultiUrls({ urlList: [
        '/test/test.json',
        (state.localhost || '') + '/test/test.json'
      ] }, function (error, data) {
        utility2.tryCatch(function () {
          /* assert no error occurred */
          utility2.assert(!error, error);
          utility2.assert(data.data === '"hello test"', data.data);
          onEventReady();
        }, onEventReady);
      });
    },

    _ajaxMultiUrls_error_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's error handling behavior
      */
      utility2.ajaxMultiUrls({ urlList: [null] }, function (error) {
        utility2.tryCatch(function () {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    },

    _ajaxMultiUrls_nullCase_test: function (onEventError) {
      /*
        this function tests ajaxMultiUrls's null case handling behavior
      */
      utility2.ajaxMultiUrls(null, function (error) {
        utility2.tryCatch(function () {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          onEventError();
        }, onEventError);
      });
    }

  };
  local._init();
}());
























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































(function moduleServerShared() {
  /*
    this shared module exports the server api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleServerShared',

    _init: function () {
      utility2.initLocal(local);
    },

    '_routerLoggingDict_/_ignoreLogging_test': function (onEventError) {
      /*
        this function tests routerLoggingDict_/'s ignore logging handling behavior
      */
      utility2.ajax({ url: '/favicon.ico' }, function () {
        onEventError();
      });
    },

    '_routerMainDict_/_default_test': function (onEventError) {
      /*
        this function tests _routerMainDict_/'s default handling behavior
      */
      utility2.ajax({ url: '/' }, onEventError);
    },

    '_routerMainDict_/public_default_test': function (onEventError) {
      /*
        this function tests routerMainDict_/public's default handling behavior
      */
      var onEventReady;
      onEventReady = utility2.untilReady(onEventError);
      onEventReady.remaining += 2;
      /* test default handling behavior */
      utility2.ajax({ url: '/public/utility2/utility2.js' }, function (error) {
        utility2.tryCatch(function () {
          /* assert no error occurred */
          utility2.assert(!error, error);
          onEventReady();
        });
      });
      /* test non-existent url handling behavior */
      utility2.ajax({ url: '/public/' + utility2.uuid4() }, function (error) {
        utility2.tryCatch(function () {
          /* assert error occurred */
          utility2.assert(error instanceof Error, error);
          onEventReady();
        });
      });
    }

  };
  local._init();
}());