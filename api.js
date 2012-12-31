(function() {
    function pageViewAdapter(pageView) {
        return {
            'url': pageView.url,
            'title': pageView.title,
            'start_time': pageView.startTime,
            'duration': pageView.duration
        };
    }
    var url_prefix = '';

    function Api() {
        this.url_prefix = '';
    }

    Api.prototype = {
        construtor: Api,
        sendPageView: function(pageview, success) {
            pageview = pageViewAdapter(pageview);
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