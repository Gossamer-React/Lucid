console.log('Background script running')

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  // console.log(tab)
  let msg = {
    txt: 'hi'
  }
  chrome.tabs.sendMessage(tab.id, msg)
}

const connections = {};

// chrome.runtime.onConnect.addListener(function(devToolsConnection) {
//   console.log('devToolsConnection up');

//   // assign the listener function to a variable so we can remove it later
//   var devToolsListener = function(message, sender, sendResponse) {
//       // Inject a content script into the identified tab
//       chrome.tabs.executeScript(message.tabId,
//           { file: 'contentScript.js' })
//   }
//   // add the listener
//   devToolsConnection.onMessage.addListener(devToolsListener);

//   devToolsConnection.onDisconnect.addListener(function() {
//        devToolsConnection.onMessage.removeListener(devToolsListener);
//   });
// })

// chrome.extension.onConnect.addListener(function (port) {
//   let extensionListener = (message, sender, res) => {
//     if (message.name == 'connect' && message.tabId) {
//       chrome.tabs.sendMessage(message.tabId, message);
//       connections[message.tabId] = port;
//       return;
//     }
//   };
//   port.onMessage.addListener(extensionListener);

//   port.onDisconnect.addListener(function (port) {
//     port.onMessage.removeListener(extensionListener);
//     let tabs = Object.keys(connections);
//     for (let i = 0; i < tabs.length; i += 1) {
//       if (connections[tabs[i]] == port) {
//         delete connections[tabs[i]];
//         break;
//       }
//     }
//   });
// });

// chrome.extension.onMessage.addListener(function (req, sender, res) {
//   if (sender.tab) {
//     let tabId = sender.tab.id;
//     if (tabId in connections) {
//       connections[tabId].postMessage(req);
//     }
//   }
//   return true;
// });
