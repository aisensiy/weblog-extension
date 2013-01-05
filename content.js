(function() {

  var scrollTime = 0;
  var lastfocus = 0;
  var lastblur = 0;
  var SMALLEST_EVENT_INTERVAL = 500;
  var SMALLEST_MOUSE_INTERVAL = 10000;
  var tid;

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
    clearTimeout(tid);
    tid = setTimeout(function() {
      sendEvent('focus', window.location.href, document.title);
    }, SMALLEST_EVENT_INTERVAL);
    
    lastfocus = +new Date();
  });

  window.addEventListener('blur', function(e) {
    console.log("bulr!");
    var now = new Date();
    if (now - lastblur < SMALLEST_EVENT_INTERVAL) return;
    lastblur = +new Date();
    if (now - lastfocus < SMALLEST_EVENT_INTERVAL) {
      console.log("too shot from last focus!!!");
      clearTimeout(tid);
      return;
    }
    sendEvent('blur', window.location.href, document.title);
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