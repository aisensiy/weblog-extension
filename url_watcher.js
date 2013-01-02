(function() {
  var RELEVANT_DETAILS = ['title'];
  var INACTIVITY_TIMEOUT = 60 * 1000;

  var UrlWatcher = function(url, onInactivate) {
    
    this.url = url;
    this.onInactivate = onInactivate;
    this.dets = {
      url: url,
      startTime: new Date().getTime(),
      reactiveTime: new Date().getTime(),
      duration: 0
    };
    this._resetTimer();
  };

  UrlWatcher.prototype = {
    notify: function(eventName, tab) {
      var relevantDets = _.pick(tab, RELEVANT_DETAILS);
      _.extend(this.dets, relevantDets);

      console.log("catch event " + eventName);
      console.log(tab);

      switch (eventName) {
        case 'mousemove':
          this._refreshTimer();
          break;
        case 'focus':
        case 'domready':
          this._resetTimer();
          break;
        case 'blur':
          this.goPauseTimer();
          break;
        case 'tab.onRemoved':
        case 'unload':
        case 'hashchange':
          this.goInactive();
          break;
      }

    },

    goInactive: function() {
      clearTimeout(this.tid);
      this.goPauseTimer();
      this.dets.endTime = new Date().getTime();
      this.onInactivate();
    },

    goPauseTimer: function() {
      console.log('go pause and go in active if no action ' + this.url);
      clearTimeout(this.tid);
      this.dets.duration += new Date() - this.dets.reactiveTime;
      var self = this;
      this.tid = setTimeout(function() {
        self.dets.endTime = +new Date();
        self.onInactivate();
      }, INACTIVITY_TIMEOUT);
    },

    _resetTimer: function() {
      this._refreshTimer();

      this.dets.reactiveTime = new Date();
    },

    _refreshTimer: function() {
      clearTimeout(this.tid);
      this.tid = setTimeout(this.goInactive.bind(this), INACTIVITY_TIMEOUT);
    }
  };

  provide('UrlWatcher', UrlWatcher);
}());