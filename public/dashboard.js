$(document).ready(function() {
    var refreshRate = '5000';
    var guid = 'scjocp3-a9fc';
    var api_ranking = 'http://blackjack-ranking.apps.'+guid+'.open.redhat.com/blackjack/user/ranking';

    $.getJSON(api_ranking, function (response) {

        function updateChart(response) {
            var dynatable = $('#blackjack-ranking').data('dynatable'),
                categories = [], 
                values = [];
            $.each(dynatable.settings.dataset.records, function() {
                categories.push(this.email);
                values.push(parseFloat(this.balance.replace(/,/, '')));
                });
            
            chart.xAxis[0].setCategories(categories);
            chart.series[0].setData(values);
        };

        // formating response
        
        for (var i = 0; i < response.length; i++) {
            money = Number(response[i].balance).toLocaleString('en-US', { minimumFractionDigits: 2 });
            response[i].balance = money;
        }

        $('#blackjack-ranking').dynatable({
            inputs: {
                queryEvent: 'blur change keyup',
                recordCountTarget: $chart,
                paginationLinkTarget: $chart,
                searchTarget: $chart,
                perPageTarget: $chart
              },
            features: {
                paginate: true,
                search: false,
                sorting: false
            },
            dataset: {
                perPageOptions: [5, 10, 20],
                records: response
            }
        }).bind('dynatable:afterProcess', updateChart);;

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

        const interval = setInterval(updateChart(), refreshRate);

    });

});
