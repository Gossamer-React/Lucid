
console.log("content script running!")

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  if (message.txt === 'hi') {
    let paragraphs = document.getElementsByTagName('p');
    for (el of paragraphs) {
      el.style['background-color'] = '#FF0000';
    }
  }
}
