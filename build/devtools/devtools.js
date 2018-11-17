chrome.devtools.panels.create(
  'Lucid', // title for the panel tab
  null, // you can specify here path to an icon
  'index.html', // html page for injecting into the tab's content
  () => {
    const port = chrome.extension.connect({ name: 'lucid' });
    port.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // port.onMessage.addListener((msg) => {
    //   if (!msg.data) return; // abort if data not present, or if not of type object
    //   if (typeof msg !== 'object') return;
    //   if(JSON.stringify(curData) !== JSON.stringify(msg)) {
    //     curData = msg;
    //     logMode = false;
    //     clearInterval(this.update);
    //     this.update = 0;    
    //     this.update = setInterval( () => this.updateTree(), 100);
    //   }
    // });
  }
);


// var backgroundPageConnection = chrome.runtime.connect({
//   name: "devtools-page"
// });

// backgroundPageConnection.onMessage.addListener(function (message) {
//   // Handle responses from the background page, if any
// });

// // Relay the tab ID to the background page
// chrome.runtime.sendMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: "contentScript.js"
// });
