var _DevtoolPort;
var _ContentscriptPort;

// * store tab-port connections from multiple open tabs to lucid panel in an array
const connections = {};

// * listens to ports being connected
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'devtool-background-port') {
    _DevtoolPort = port;

    console.log('Background');
    // * receive message from devtools to trigger reactTraverse
    let extensionListener = (message, sender, res) => {
      if (message.name === 'connect' && message.tabId) {
        console.log('Background Hello');
        chrome.tabs.sendMessage(message.tabId, message);
        connections[message.tabId] = port;
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
  delete connections[tabId];     
});

//* When react router is invoked a tab change happens and the traverser is lost. This sends a message to the content script so it can check if the traverser needs to be reinjected.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if(!connections[tabId]){return;}
  if(changeInfo.status === 'complete' && _DevtoolPort){
    chrome.tabs.sendMessage(tabId, {type: 'tabChange'});
  }
});