console.log("Background script running");
const _Logs = [];
var _DevtoolPort;
var _ContentscriptPort;

const connections = {};

// * listens to ports being connected
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'devtool-background-port') {
    console.log('background script connected to devtools port', port);
    _DevtoolPort = port;

    //receive message from devtools to trigger reactTraverse
    let extensionListener = (message, sender, res) => {
      if (message.name === 'connect' && message.tabId) {
        console.log('backgroundscript received connect request from devtools; message.tabid:', message)
        chrome.tabs.sendMessage(message.tabId, message);
        connections[message.tabId] = port;
        console.log('connections obj: ', connections)
        return;
      }
    }
    port.onMessage.addListener(extensionListener);

  } else if (port.name === 'contentscript-backgroundscript-port') {
    console.log('connected to the content script', port);
    contentscriptPort = port;

    // * adds a listener to listen for messages from the content script
    contentscriptPort.onMessage.addListener(content => {
      if(content.type === 'content-script'){
        console.log('Devtool Port: ', _DevtoolPort);
        // * sends the message received from the content script to the devtools
        _DevtoolPort.postMessage({ type: 'appState', msg: content.message });
      }
    });
  }
});

// * Will listen to webrequest before they have been made
chrome.webRequest.onBeforeRequest.addListener(
  e => {
    if (e.initiator !== 'http://localhost:3000') {
      return;
    } else {
      if (e.requestBody) {
        console.log(e);
        // TODO: if e.requestBody is formdata send it through without parsing it
        if (e.requestBody.raw) {
          let raw = e.requestBody.raw;
          let enc = new TextDecoder('utf-8');
          let arr = new Uint8Array(raw[0].bytes);
          let data = JSON.parse(enc.decode(arr));

          _Logs.push(data);
          console.log(_Logs);
        }
      }
    }

    // * sending http requests log to devtools port
    if (_DevtoolPort) {
      _DevtoolPort.postMessage({ type: 'requestLogs', msg: _Logs });
    }
  },
  { urls: ['<all_urls>'], types: ['xmlhttprequest'] },
  ['requestBody']
);