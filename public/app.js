/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true, stupid: true*/
/*global global, required, state, utility2, $*/
(function moduleMyAppBrowser() {
  /*
    this nodejs module exports the saucelabs test api
  */
  'use strict';
  var local;
  local = {

    _name: 'utility2.moduleMyAppBrowser',

    _init: function () {
      $(local._initReady);
    },

    _initReady: function () {
      window.global = window;
      local._stockInput = document.getElementById('stockInput');
      local._stockInput.value = '0696';
      local._stockInputButton = document.getElementById('stockInputButton');
      local._insiderIframe = document.getElementById('insiderIframe');
      local._yahooIframe = document.getElementById('yahooIframe');
      local._stockInput.addEventListener('change', local._onEventRefresh);
      local._stockInputButton.addEventListener('click', local._onEventRefresh);
    },

    _onEventRefresh: function () {
      /* update yahoo iframe */
      local._yahooIframe.src =
        'http://finance.yahoo.com/echarts?s=' + local._stockInput.value + '.HK';
      /* update insider iframe */
      utility2.ajax({
        url: 'http://utility2-proxy.herokuapp.com/http://sdinotice.hkex.com.hk/di/NSSrchCorpList.aspx?sa1=cl&scsd=01/01/2010&sced=01/01/2020&src=MAIN&lang=EN&sc=' + local._stockInput.value
      }, function (error, data) {
        utility2.nop(error);
        local._insiderIframe.src = 'http://sdinotice.hkex.com.hk/di/' + (/([^"]+)">List of notices filed by substantial shareholders/).exec(data)[1];
      });
    }

  };
  local._init();
}());
