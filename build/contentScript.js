console.log("content script running!")

// * opens new port to connect to our backendscript
const contentScriptPort = chrome.runtime.connect({ name: 'contentscript-backgroundscript-port' });

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

//listen for messages from the reactTraverser
window.addEventListener('message', (e) => {
  if (e.data.type=='reactTraverser') {    
    reactDocObj = e.data.data;
   contentScriptPort.postMessage({type: 'content-script', message: reactDocObj});
  }
});

//listen for the signal and tell reactTraverser to run
chrome.runtime.onMessage.addListener((message, sender, res) => {
  if (message.name === 'connect') {
    // console.log('dispatched RT event to window:', message)
    const newEvent = new Event('run-traverser');
    window.dispatchEvent(newEvent);
  }
});