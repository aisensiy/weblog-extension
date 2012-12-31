(function() {
    var cmd = {
        init: function(tabid) {
            window.tab[tabid] = {
                created_at: +new Date()
            };
        },
        start: function(tabid, title, url) {
            if (!window.tab[tabid]) {
                console.err("[error] start before init tabid: " + tabid);
                return;
            }
            window.tab[tabid].title = title;
            window.tab[tabid].url = url;
            tabid.start_at = +new Date();
        },
        clear: function(tabid) {
            delete window.tab[tabid];
        },
        update: function(tabid) {
            var title = window.tab[tabid].title;
            var url = window.tab[tabid].url;
            this.clear(tabid);
            this.init(tabid);
            this.start(tabid, title, url);
        }
    };

})();