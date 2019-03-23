// * opens new port to connect to our backendscript
let contentScriptPort;

//To access the DOM & reactDevToolsGlobalHook, inject the script into the document body:
function injectScript(file) {
  //this adds <script type='text/javascript' src='reactTraverser.js'></script> to the DOM's body
  const body = document.getElementsByTagName('body')[0];
  const scriptFile = document.createElement('script');
  scriptFile.id = 'traverser';
  scriptFile.setAttribute('type', 'text/javascript');
  scriptFile.setAttribute('src', file);
  body.appendChild(scriptFile);
}

chrome.runtime.onMessage.addListener((message, sender, res) => {
  //* listen for message.name connect to inject the traverser
  if (message.name === 'connect') {
    if (!document.getElementById('traverser')) {
      injectScript(chrome.extension.getURL('reactTraverser.js'));
    }
  }
  // * receives message about tab update
  // TODO: change message.type to message.name 
  if (message.type && message.type === 'tabChange') {
    if (!document.getElementById('traverser')) {
      injectScript(chrome.extension.getURL('reactTraverser.js'));
    }
  }
});

//listen for messages from the reactTraverser
window.addEventListener('message', e => {
  if (e.data === undefined) return;
  if (e.data.type == 'reactTraverser') {
    reactDocObj = e.data.data;

    chrome.runtime.sendMessage(
      {
        type: "content-script",
        message: reactDocObj
      }
    )
  } else {
    return;
  }
});

 // * code below is in case we want to purposely invoke the traverser. May or may not be used.
    // const newEvent = new Event('run-traverser');
    // window.dispatchEvent(newEvent);