(function() {

  var nav = chrome.webNavigation,
      tab = chrome.tabs,
      ext = chrome.extension,
      UrlWatcher = require('UrlWatcher'),
      api = require('Api');

  function isAllowedUrl(url) {
    if (!Util.isValidUrl(url) ||
        _.include(['demo.d.me', 'd.me'], Util.getHostname(url))) {
      return false;
    }

    localStorage.blacklist = localStorage.blacklist || '[]';
    var blacklist = JSON.parse(localStorage.blacklist);

    var result = !_.any(blacklist, function(pattern) {
      return Util.urlFilter(pattern, url);
    });

    return result;
  }

  var EventListener = function() {
    this._watchers = {};
  };

  EventListener.prototype = {
    addListeners: function() {
      ext.onMessage.addListener(this.onContent.bind(this));
    },

    onContent: function(request, sender, sendResponse) {
      if (!isAllowedUrl(request.url)) return;
      var watcher = this._getWatcher(request.url);
      watcher.notify(request.event, request);
    },

    _getWatcher: function(url) {
      var watcher = this._watchers[url];
      if (!watcher) {
        watcher = this._watchers[url] = new UrlWatcher(url, function() {
          this._removeWatcher(watcher);
        }.bind(this));
      }

      return watcher;
    },

    _removeWatcher: function(watcher) {
      delete this._watchers[watcher.url];
      if (watcher.dets.duration) {
        api.sendPageView(watcher.dets, function() {});
      }
    }
  };

  provide('EventListener', EventListener);
}());