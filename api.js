(function() {
    var url_prefix = '';

    function Api() {
        this.url_prefix = '';
    }

    Api.prototype = {
        construtor: Api,
        sendPageView: function(pageview, success) {
            // $.ajax({
            //     url: '/api/uploaddata',
            //     type: 'POST',
            //     data: pageview,
            //     success: success
            // });
            console.log(pageview);
        }
    };

    provide('Api', new Api());
})();