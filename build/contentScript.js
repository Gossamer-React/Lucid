console.log("content script running!")

// * opens new port to connect to our backendscript
const devtoolPort = chrome.runtime.connect({ name: 'contentscript-backgroundscript-port' });
devtoolPort.postMessage({greeting: 'Hello from the content script'});


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
    reactDocObj = e.data.data
    console.log('contentScript reactDocObj', reactDocObj)
    // port.postMessage({joke: "Knock2knock"});
  }
  // chrome.extension.sendMessage(e.data);
});
