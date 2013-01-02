(function() {
    function pageViewAdapter(pageView) {
        return {
            'page_view[url]': pageView.url,
            'page_view[title]': pageView.title,
            'page_view[start_time]': parseInt(pageView.startTime, 10),
            'page_view[duration]': parseInt(pageView.duration, 10)
        };
    }
    var url_prefix = 'http://ali:3000';

    function Api() {
        this.url_prefix = '';
    }

    Api.prototype = {
        construtor: Api,
        sendPageView: function(pageview, success) {
            pageview = pageViewAdapter(pageview);
            $.ajax({
                url: url_prefix + '/api/uploaddata.json',
                type: 'POST',
                data: pageview,
                success: success
            });
            // console.log(pageview);
        }
    };

    provide('Api', new Api());
})();