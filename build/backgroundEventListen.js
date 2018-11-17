console.log('Background event listening script running')

// chrome.runtime.onInstalled.addListener(eventEmitted);

function eventEmitted(tab) {
  console.log(tab)
  let msg = {
    txt: 'event emitted'
  }
  // chrome.tabs.sendMessage(tab.id, msg)
}
