(function() {

  var scrollTime = 0;
  var lastfocus = 0;
  var lastblur = 0;
  var SMALLEST_EVENT_INTERVAL = 500;
  var SMALLEST_MOUSE_INTERVAL = 10000;

  sendEvent('domready', window.location.href, document.title);

  window.addEventListener('mousemove', function() {
    var now = new Date().getTime();
    if (now - scrollTime > SMALLEST_MOUSE_INTERVAL) {
      scrollTime = now;
      sendEvent('mousemove', window.location.href, document.title);
    }
  });

  window.addEventListener('hashchange', function(e) {
    sendEvent('hashchange', window.location.href, document.title);
  });

  window.addEventListener('focus', function(e) {
    if (new Date() - lastfocus < SMALLEST_EVENT_INTERVAL) return;
    sendEvent('focus', window.location.href, document.title);
    lastfocus = +new Date();
  });

  window.addEventListener('blur', function(e) {
    if (new Date() - lastblur < SMALLEST_EVENT_INTERVAL) return;
    sendEvent('blur', window.location.href, document.title);
    lastblur = +new Date();
  });

  window.addEventListener('unload', function() {
    sendEvent('unload', window.location.href, document.title);
  });

  function sendEvent(name, url, title) {
    chrome.extension.sendMessage({
      event: name,
      url: url,
      title: title
    });
  }
}());