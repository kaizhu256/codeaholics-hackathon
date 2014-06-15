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
      utility2.initLocal(local);
    },

    _initOnce: function () {
      window.global = window;
      local._stockInput = document.getElementById('stockInput');
      local._stockInput.value = '0358';
      local._stockInputButton = document.getElementById('stockInputButton');
      local._insiderIframe = document.getElementById('insiderIframe');
      // local._yahooIframe = document.getElementById('yahooIframe');
      local._stockInput.addEventListener('change', local._onEventRefresh);
      local._stockInputButton.addEventListener('click', local._onEventRefresh);
      local._onEventRefresh();
    },

    _onEventRefresh: function () {
      var volume;
      // /* update yahoo iframe */
      // local._yahooIframe.src =
        // 'http://finance.yahoo.com/echarts?s=' + local._stockInput.value + '.HK';
      /* update insider iframe */
      utility2.ajax({
        url: 'http://utility2-proxy.herokuapp.com/http://sdinotice.hkex.com.hk/di/NSSrchCorpList.aspx?sa1=cl&scsd=01/01/2010&sced=01/01/2020&src=MAIN&lang=EN&sc=' + local._stockInput.value
      }, function (error, data) {
        utility2.nop(error);
        local._insiderIframe.src = 'http://sdinotice.hkex.com.hk/di/' + (/([^"]+)">List of notices filed by substantial shareholders/).exec(data)[1];
      });

      utility2.ajax({
        url: 'https://utility2-proxy.herokuapp.com/http://ichart.finance.yahoo.com/table.csv'
          + '?s=' + local._stockInput.value + '.HK'
          + '&a=00&b=01&c=2010'
          + '&d=00&e=01&f=2020'
      }, function (error, data) {
        utility2.nop(error);
        data = data.trim().split('\n').map(function (row) {
          row = row.split(',');
          return [
            new Date(row[0]).getTime(),
            Number(row[1]),
            Number(row[2]),
            Number(row[3]),
            Number(row[4]),
            Number(row[5])
          ];
        }).filter(function (row) {
          return row[2];
        }).sort();

        volume = data.map(function (row) {
          return [row[0], row[5]];
        });
        console.log(volume);

        // create the chart
        $('#container').highcharts('StockChart', {

          rangeSelector: {
            inputEnabled: $('#container').width() > 480,
            selected: 1
          },

          title: {
            text: local._stockInput.value + ' Historical'
          },

          yAxis: [{
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2
          }, {
          labels: {
            align: 'right',
            x: -3
          },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
          }],

          series: [{
              type: 'candlestick',
              name: local._stockInput.value,
              data: data,
          }, {
              type: 'column',
              name: 'Volume',
              data: volume,
              yAxis: 1,
          }]
        });

      });


    }

  };
  local._init();
}());
