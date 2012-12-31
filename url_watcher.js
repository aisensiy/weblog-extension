function extend(obj1, obj2) {
  var prop;
  for(prop in obj1) {
    obj1[prop] = obj2[prop];
  }
}

UrlWatcher = (function() {
  var RELEVANT_DETAILS = ['title'];

  var INACTIVITY_TIMOUT = 2 * 60 * 1000;
  // var INACTIVITY_TIMOUT = 5 * 1000;

  var UrlWatcher = function(title, url, onInactivate) {
    
    this.title = title;
    this.url = url;
    this.onInactivate = onInactivate;
    this.dets = {
      title: title,
      url: url,
      created_at: +new Date()
    };
    this._resetTimer();
  };

  UrlWatcher.prototype = {
    notify: function(eventName, tab) {
      var title = tab.title;
      var url = tab.url;



      switch (eventName) {
        case 'mousemove':
        case 'focus':
        case 'domready':
          this._resetTimer();
          break;
        case 'tab.onRemoved':
        case 'unload':
          this.goInactive();
          break;
      }

      
    },

    goInactive: function() {
      clearTimeout(this.tid);

      this.dets.endTime = new Date().getTime();
      this.onInactivate();
    },

    _resetTimer: function() {
      clearTimeout(this.tid);

      this.tid = setTimeout(this.goInactive.bind(this), INACTIVITY_TIMOUT);
    }
  };

  return UrlWatcher;
}());