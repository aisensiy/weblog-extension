window.tab = {};
var CMD = (function() {
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
            window.tab[tabid].start_at = +new Date();
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
    return cmd;
})();

// test for cmd
(function() {
    // normal flow
    CMD.init(1);
    console.log(window.tab[1]);
    console.assert(window.tab[1]);
    console.assert(window.tab[1].created_at);
    CMD.start(1, 'test', 'http://example.com');
    console.log(window.tab[1]);
    console.assert(window.tab[1].title == 'test');
    console.assert(window.tab[1].url == 'http://example.com');
    console.assert(window.tab[1].start_at);
    CMD.clear(1);
    console.assert(!window.tab[1]);
    console.log(window.tab[1]);

    // update
    CMD.init(2);
    console.log(window.tab[2]);
    console.assert(window.tab[2]);
    console.assert(window.tab[2].created_at);
    CMD.start(2, 'test', 'http://example.com');
    console.log(window.tab[2]);
    console.assert(window.tab[2].title == 'test');
    console.assert(window.tab[2].url == 'http://example.com');
    console.assert(window.tab[2].start_at);
    var old_start_at = window.tab[2].start_at;
    CMD.update(2);
    console.log(window.tab[2]);
    console.assert(window.tab[2].title == 'test');
    console.assert(window.tab[2].url == 'http://example.com');
    console.assert(window.tab[2].start_at);
    console.assert(window.tab[2].start_at != old_start_at);
    CMD.clear(1);
    console.assert(!window.tab[1]);
    console.log(window.tab[1]);
})();