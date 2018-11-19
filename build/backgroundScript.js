console.log("Background script running");
const _Logs = [];
var _DevtoolPort;
var _ContentscriptPort;

// * listens to ports being connected
chrome.runtime.onConnect.addListener(port => {
  console.log('PORT: ', port.name);
  if (port.name === "devtool-background-port") {
    console.log("background script connected to devtools port", port);
    _DevtoolPort = port;
  } else if (port.name === "contentscript-backgroundscript-port") {
    console.log("connected to the content script", port);
    contentscriptPort = port;

    contentscriptPort.onMessage.addListener(content => {
      console.log("FROM CONTENT SCRIPT: ", content);
    });
  }
});

// * Will listen to webrequest before they have been made
chrome.webRequest.onBeforeRequest.addListener(
  e => {
    if (e.initiator !== "http://localhost:3000") {
      return;
    } else {
      if (e.requestBody) {
        console.log(e);
        if (e.requestBody.raw) {
          let raw = e.requestBody.raw;
          let enc = new TextDecoder("utf-8");
          let arr = new Uint8Array(raw[0].bytes);
          let data = JSON.parse(enc.decode(arr));

          _Logs.push(data);
          console.log(_Logs);
        }
      }
    }

    // * sending http requests log to devtools port
    _DevtoolPort.postMessage({ type: "requestLogs", msg: _Logs });
  },
  { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
  ["requestBody"]
);

// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked(tab) {
//   // console.log(tab)
//   let msg = {
//     txt: 'hi'
//   }
//   chrome.tabs.sendMessage(tab.id, msg)
// }

// const connections = {};

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
