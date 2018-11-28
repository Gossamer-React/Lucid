console.log("Background script running");
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
  } 
});

// Receives message from content-script and checks for valid connections before posting to devtools
chrome.runtime.onMessage.addListener(function (req, sender, res) {  
  if (req.type === 'content-script') {
    if (sender.tab) {
      let tabId = sender.tab.id;
      if (tabId in connections) {
        //send the request to the specific port in the connections object associated to our tabId
        connections[tabId].postMessage(
          { type: 'appState', msg: req.message }
        );
      } else console.log('ATTENTION:: Tab not found in connection list');
    } else console.log('ATTENTION:: sender.tab not defined');
    return true;
  }
});

//Remove tabId/port from connection object after tab is closed. 
chrome.tabs.onRemoved.addListener(function(tabId) {
  console.log('Tab: ' + tabId + 'is closed');
  delete connections[tabId];     
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if(!connections[tabId]){return;}
  if(changeInfo.status === 'complete' && _DevtoolPort){
    console.log('changeInfo', changeInfo, tabId);
    chrome.tabs.sendMessage(tabId, {type: 'tabChange'});
  }
});