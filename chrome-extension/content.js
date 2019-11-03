/**
 * @File   : content.js
 * @Author : dtysky (dtysky@outlook.com)
 * @Link   : dtysky.moe
 * @Date   : 2019/11/3 下午4:20:04
 */
function injectInspector(jsPath, callback) {
  var script = document.createElement('script');

  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL(jsPath);
  script.onload = function () {
    this.parentNode.removeChild(this);

    if (callback) {
      callback();
    }
  };

  document.head.appendChild(script);
}

function main() {
  if (main.injected) {
    return;
  }

  injectInspector('inspector.js', function () {
    injectInspector('inject.js', () => {
      main.injected = true;
    });
  });
}
main.injected = false;

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
  {
      if (request.cmd === 'inject') {
        main();
      }
  });
});
