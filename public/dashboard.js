$(document).ready(function() {
    var guid = 'b5a8';
    var server = 'blackjack-api.apps.chile-'+guid+'.open.redhat.com';
    var api_url = 'http://'+server+'/blackjack/user/ranking';

    $.getJSON(api_url, function(response) {
        console.log(response);

        // formating response
        for (var i=0; i < response.length; i++) {
            money = Number(response[i].balance/100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            response[i].balance = money;
        }

        $('#blackjack-ranking').dynatable({
            features: {
                paginate: false,
                search: false,
                sorting: false
            },
            dataset: {
                records: response
            }
        });

    var $chart = $('#blackjack-chart'), chart; 
    // Set up our Highcharts chart
    chart = new Highcharts.Chart({
     chart: {
      type: 'column',
      renderTo: 'blackjack-chart'
    },
    title: {
      text: 'Ranking'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Winnings ($)'
      }
    },
    series: [{
      name: 'Users',
      color: '#006A72'
    }]
  });
    });
    
} );
