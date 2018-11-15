console.log("content script running!")

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  if (message.txt === 'hi') {
    let paragraphs = document.getElementsByTagName('body');
    for (el of paragraphs) {
      el.style['background-color'] = '#FF0000';
    }
  }
}

//To access the DOM & reactDevToolsGlobalHook, inject the hook script into the document body:
function injectScript(file) {
  //this adds <script type='text/javascript' src='hook.js'></script> to the DOM's body
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}

injectScript(chrome.extension.getURL('hook.js'));

// window.addEventListener('message', (e) => {
//   if (e.source !== window) return;
//   chrome.extension.sendMessage(e.data);
// });

// chrome.extension.onMessage.addListener(() => {
//   const newEvent = new Event('lucid');
//   window.dispatchEvent(newEvent);
// });
