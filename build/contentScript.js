console.log("content script running!")

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  if (message.txt === 'hi') {
    let body = document.getElementsByTagName('body');
    console.log('this is document body... [0]?', body)
    for (el of body) {
      el.style['background-color'] = '#FF0000';
    }
  }
}

//To access the DOM & reactDevToolsGlobalHook, inject the script into the document body:
function injectScript(file) {
  //this adds <script type='text/javascript' src='reactTraverser.js'></script> to the DOM's body
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}

injectScript(chrome.extension.getURL('reactTraverser.js'));

