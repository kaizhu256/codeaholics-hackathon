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
        var insiderList, volume;
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

        insiderList = [[1401984000000, 545091], [1401811200000, -1188000], [1401724800000, -4257622], [1400601600000, -3988785], [1399910400000, 1430000], [1399478400000, -5292038], [1399219200000, -1146000], [1397145600000, -164469], [1396886400000, -105000], [1396540800000, 1867963], [1396454400000, -2021731], [1396281600000, 800000], [1396195200000, -115000], [1395849600000, 2059098], [1394553600000, -2396622], [1394467200000, 3154049], [1394035200000, -2052811], [1393516800000, 1442855], [1393344000000, -1706259], [1393171200000, 924793], [1393171200000, 300000], [1392566400000, -578784], [1391529600000, 1980722], [1391443200000, 1465000], [1390320000000, 4154031], [1390233600000, -3051001], [1389801600000, 719000], [1389715200000, -1443693], [1389715200000, 1154000], [1389628800000, 2198757], [1389628800000, 607000], [1389196800000, 2795000], [1389196800000, -2745407], [1389110400000, 2540712], [1389110400000, 654000], [1388678400000, -2965192], [1388592000000, 3952582], [1388419200000, -2543336], [1388073600000, 5550653], [1388073600000, 248502], [1387468800000, -2067000], [1386691200000, 2664059], [1386604800000, -7866082], [1385913600000, 5046329], [1385654400000, -2413059], [1385395200000, 7700000], [1385395200000, 3067515], [1385308800000, -2759537], [1385049600000, 2774190], [1384790400000, -4999463], [1384704000000, 4442369], [1384099200000, -2896481], [1383840000000, 2094871], [1383667200000, -476391], [1383494400000, 1108779], [1383494400000, 100000], [1381334400000, -3035535], [1381248000000, 992373], [1380643200000, 119500], [1380211200000, -330000], [1379865600000, 343000], [1379433600000, -591000], [1379347200000, -126000], [1378828800000, 6272305], [1378742400000, 172400], [1378310400000, 102507], [1378137600000, -1070000], [1377619200000, 441000], [1377446400000, -1845006], [1376928000000, 412000], [1376841600000, 1114000], [1376582400000, 1646438], [1376496000000, 781000], [1376323200000, 108000], [1376236800000, -271000], [1375977600000, -905000], [1375804800000, -1492997], [1375718400000, 4742997], [1375372800000, 1712094], [1375200000000, -776322], [1375113600000, 677000], [1374768000000, -5946000], [1374681600000, 403322], [1374422400000, 115000], [1374163200000, -567000], [1374076800000, 972000], [1373990400000, -769322], [1373385600000, -115800], [1373212800000, -181271], [1372953600000, 188301], [1372262400000, -282969], [1372176000000, -5180815], [1371744000000, 3760000], [1371657600000, 4000000], [1371139200000, 4441000], [1371052800000, -8835568], [1370275200000, 2189000], [1369929600000, -2000000], [1369756800000, 3687119], [1369670400000, -686], [1369584000000, 888], [1369238400000, -3679004], [1368633600000, 13581000], [1368633600000, 417901], [1367769600000, -695000], [1367510400000, -2821942], [1367510400000, 1594406], [1364745600000, -650000], [1364486400000, -3478751], [1362672000000, 3525089], [1362672000000, -2510306], [1362585600000, -106408], [1362412800000, 2709960], [1361980800000, 2204406], [1361808000000, -3436275], [1361462400000, -3465795], [1361462400000, 3666044], [1361203200000, 80501], [1361116800000, -1150449], [1360080000000, 1392200], [1359993600000, -1923941], [1359475200000, 1396227], [1359475200000, -251204], [1358265600000, 1004000]].sort();

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
              text: 'Insider'
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
            name: 'Insider',
            data: insiderList,
            yAxis: 2
          }]
        });

      });


    }

  };
  local._init();
}());
