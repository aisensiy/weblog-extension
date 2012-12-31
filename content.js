(function() {

  var scrollTime = 0,
    lastFocus = 0;

  /**
   * http://js8.in/682.html smallest dom ready
   */
  function r(f) {
    /in/.test(document.readyState) ? setTimeout(function() { r(f); }, 9) : f();
  }

  r(function() {
    sendEvent('domready', window.location.href, document.title);

    window.addEventListener('mousemove', function() {
      var now = new Date().getTime();
      if (now - scrollTime > 10000) {
        scrollTime = now;
        sendEvent('mousemove', window.location.href, document.title);
      }
    });

    window.addEventListener('focus', function(e) {
      if (new Date() - lastFocus < 500) return;
      sendEvent('focus', window.location.href, document.title);
      lastFocus = +new Date();
    });
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