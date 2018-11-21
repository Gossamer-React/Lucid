console.log("Background script running");
const _Logs = [];
var _DevtoolPort;
var _ContentscriptPort;

// * store tab-port connections from multiple open tabs to lucid panel in an array
const connections = {};

// * listens to ports being connected
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'devtool-background-port') {
    console.log('background script connected to devtools port', port);

    _DevtoolPort = port;

    // * receive message from devtools to trigger reactTraverse
    let extensionListener = (message, sender, res) => {
      if (message.name === 'connect' && message.tabId) {
        // console.log('backgroundscript received connect request from devtools; message:', message)
        // chrome.tabs.executeScript(message.tabId, { file: 'reactTraverser.js' });
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