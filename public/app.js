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
      // local._insiderIframe = document.getElementById('insiderIframe');
      local._stockInput.addEventListener('change', local._onEventRefresh);
      local._stockInputButton.addEventListener('click', local._onEventRefresh);
      local._onEventRefresh();
      /* init chat */
      local._chatInput = document.getElementById('chatInput');
      local._chatInput.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
          utility2.ajax({
            url: 'https://utility2-proxy.herokuapp.com/chat/broadcast?message=' + global.btoa(local._chatInput.value)
          }, function () {
            local._chatInput.value = '';
          });
        }
      });
      local._chatTextarea = document.getElementById('chatTextarea');
      local._message = '';
      local._evtSource = new global.EventSource("https://utility2-proxy.herokuapp.com/chat/connect");
      local._evtSource.addEventListener('message', function (event) {
        var message;
        message = global.atob((/message=(.*)/g).exec(global.atob(event.data))[1]);
        console.log(message);
        local._message += '\n' + new Date() + ': ' + message;
        local._chatTextarea.value = local._message;
      });
    },

    _onEventRefresh: function () {
      /* fetch stock data */
      utility2.ajax({
        url: 'https://utility2-proxy.herokuapp.com/http://ichart.finance.yahoo.com/table.csv'
          + '?s=' + local._stockInput.value + '.HK'
          + '&a=00&b=01&c=2010'
          + '&d=00&e=01&f=2020'
      }, function (error, data) {
        var insiderList, volume;
        utility2.nop(error);
        /* fetch disclosure data */
        utility2.ajax({
          url: 'https://utility2-proxy.herokuapp.com/http://www.etnet.com.hk/www/tc/stocks/realtime/quote_ca_sdi.php?page=1&code='
            + local._stockInput.value
        }, function (error2, data2) {
          utility2.nop(error2);

          /* parse ohlc */
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

          /* parse volume data */
          volume = data.map(function (row) {
            return [row[0], row[5]];
          });

          /* parse dislosure data */
          insiderList = (data2 || '').trim().replace((/<\/[^>]*>/g), '').split(/<tr[^>]*>/)
            .map(function (row) {
              row = row.trim().split(/<td[^>]*>/);
              return [
                new Date(row[1]).getTime(),
                Number((row[4] || '').replace((/[^\-+0-9]*/g), '')),
                row[2]
              ];
            })
            .filter(function (row) {
              return row[0] && row[1] && row[0] >= volume[0][0] && row[0] <= volume[volume.length - 1][0];
            })
            .sort();
          insiderList.forEach(function (row, ii) {
            if (ii > 0 && row[0] <= insiderList[ii - 1][0]) {
              row[0] = insiderList[ii - 1][0] + 1;
            }
          });

          // create the chart
          $('#container').highcharts('StockChart', {

            rangeSelector: {
              inputEnabled: $('#container').width() > 480,
              selected: 1
            },

            title: {
              text: local._stockInput.value + ' Historical'
            },

            xAxis: {
              lineWidth: 1
            },

            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: 'OHLC'
              },
              height: 200,
              lineWidth: 2
            }, {
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: 'Volume'
              },
              top: 300,
              height: 100,
              offset: 0,
              lineWidth: 2
            }, {
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: 'Disclose'
              },
              top: 450,
              height: 50,
              offset: 0,
              lineWidth: 2
            }],

            series: [{
              type: 'candlestick',
              name: local._stockInput.value,
              data: data
            }, {
              type: 'column',
              name: 'Volume',
              data: volume,
              yAxis: 1
            }, {
              type: 'column',
              name: 'Disclose',
              data: insiderList,
              color: '#FF0000',
              negativeColor: '#0000FF',
              threshold: 0,
              yAxis: 2
            }]
          });

        });
      });

    }

  };
  local._init();
}());
