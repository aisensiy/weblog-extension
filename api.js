(function() {
    var url_prefix = '';
    function upload_data(tabid, obj) {
        $.post('/api/uploaddata', obj, function() {
            cmd.clear(tabid);
        });
    }

})();