/*global chrome:false, require: false */
(function() {
  var site_url = 'http://demo.d.me/';

  var eventListener = new (require('EventListener'))();
  var api = require('Api');
  var history = require('History');
  var LOGIN_CHECK_DURATION = 5000;
  var DOMAIN = 'http://localhost.delicious.com';


  if (!localStorage.historyImported) {
    history.getAllHistory(function(pageViews) {
      api.sendPageViews(pageViews, function() {
        localStorage.historyImported = 'true';
      });
    });
  }
  eventListener.addListeners();

  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({
      url: site_url
    });
  });

  // check if user has login
  // setInterval(function() {
  //   chrome.cookies.get({
  //     name: 'delicious_app_user',
  //     url: DOMAIN
  //   }, function(user) {
  //     if (user) {
  //       Util.Notification.close();
  //     } else {
  //       Util.Notification();
  //     }
  //   });
  // }, LOGIN_CHECK_DURATION);

}());