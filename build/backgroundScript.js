var _DevtoolPort;
var _ContentscriptPort;

// * store tab-port connections from multiple open tabs to lucid panel in an array
const connections = {};

// * listens to ports being connected
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'devtool-background-port') {
    _DevtoolPort = port;

    // * receive message from devtools to trigger reactTraverse
    let extensionListener = (message, sender, res) => {
      if (message.name === 'connect' && message.tabId) {
        chrome.tabs.sendMessage(message.tabId, message);
        connections[message.tabId] = port;
        return;
      }
    };

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
        connections[tabId].postMessage({ type: 'appState', msg: req.message });
      } else console.log('ATTENTION:: Tab not found in connection list');
    } else console.log('ATTENTION:: sender.tab not defined');
    return true;
  }
});

//Remove tabId/port from connection object after tab is closed.
chrome.tabs.onRemoved.addListener(function (tabId) {
  delete connections[tabId];
});

//* When react router is invoked a tab change happens and the traverser is lost. This sends a message to the content script so it can check if the traverser needs to be reinjected.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!connections[tabId]) {
    return;
  }
  if (changeInfo.status === 'complete' && _DevtoolPort) {
    chrome.tabs.sendMessage(tabId, { type: 'tabChange' });
  }
});

//* This will reload extension when it is first installed.
chrome.runtime.onInstalled.addListener(details => {
  const currentVersion = chrome.runtime.getManifest().version;
  if (details.reason === 'install') {
    //* Alert is for debugging purposes, shows install message.
    // alert('This is a first install!');
    chrome.storage.local.set({ lastKnownVersion: currentVersion });
    chrome.runtime.reload();
  }
});
//* This will reload extension when there is a new update.
chrome.runtime.onUpdateAvailable.addListener(details => {
  //* Alert is for debugging purposes, shows update message.
  // alert('This is an update!');
  const newVersion = details.version;
  chrome.storage.local.get('lastKnownVersion', function (result) {
    const currentVersion = result.version;
    if (newVersion !== currentVersion) {
      //* Alert is for debugging purposes, shows update message.
      // alert('This is an update!');
      chrome.storage.local.set({ lastKnownVersion: newVersion });
      chrome.runtime.reload();
    }
  });
});
