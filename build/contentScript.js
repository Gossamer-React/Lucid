console.log("content script running!")

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

//listen for docObj data from reactTraverser
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert('the addlistener on contentScript was hit', sender.tab.url)
    if (request.greeting === 'traverse-complete') {
      alert('docObj received')
      sendResponse({farewell: 'DocumentObj was received'})
      // let body = document.getElementsByTagName('body');
    }
  }
)
  //attempt 2 using window
  ('traverseComplete', (e) => {
    alert('docObj received!!!')
    console.log('data:', e.data)
    console.log('obj:', e.obj)
    //if (e.source !== window) return;
    console.log(e)
    // chrome.extension.sendMessage(e.data);
  });

  //tell reactTraverser.js to traverse
  chrome.extension.onMessage.addListener(() => {
    const newEvent = new Event('traverse');
    window.dispatchEvent(newEvent);
  });

// //listen 
// chrome.extension.onMessage.addListener(() => {
//   var event = new CustomEvent('runTraverse', { test: 'hellofromcontentscript' });
//     window.dispatchEvent(event);
//     console.log('runTraverseDispatched')
// })


// chrome.runtime.sendMessage('Yo this is the contentscript')

// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//   if (msg.question == "Who's there?") {
//     alert('received whos there')
//     port.postMessage({answer: "Madame"});

//   }
//   else if (msg.question == "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });
