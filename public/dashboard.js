$(document).ready(function() {
    var guid = 'b5a8';
    var server = 'blackjack-api.apps.chile-'+guid+'.open.redhat.com';
    var api_url = 'http://'+server+'/blackjack/user/ranking';
    this.data = '';

    $.getJSON(api_url, function(response) {

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
    });
    
} );
