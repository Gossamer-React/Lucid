console.log('Background script running');

const _Logs = [];
// * Will listen to webrequest before they have been made
chrome.webRequest.onBeforeRequest.addListener((e) => {
  if (e.initiator !== "http://localhost:3000") {
    return;
  } else {
    if (e.requestBody) {
      console.log(e)
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

}, { urls: ["<all_urls>"], types: ["xmlhttprequest"] }, ["requestBody"]);

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  // console.log(tab)
  let msg = {
    txt: 'hi'
  }
  chrome.tabs.sendMessage(tab.id, msg)
}

const connections = {};
