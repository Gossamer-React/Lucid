console.log("content script running!")

// chrome.runtime.onMessage.addListener(gotMessage);
// function gotMessage(message, sender, sendResponse) {
//   if (message.txt === 'hi') {
//     let paragraphs = document.getElementsByTagName('p');
//     for (el of paragraphs) {
//       el.style['background-color'] = '#FF0000';
//     }
//   }
// }

// var G_reactLucidRunning; 

// if(!G_reactLucidRunning){
//   if(!window._REACT_DEVTOOLS_GLOBAL_HOOK_) console.warn('React Dev Tools are required to be installed');

//   console.log(window);
//   const rInstance = window._REACT_DEVTOOLS_GLOBAL_HOOK_;

//   console.log(rInstance);
// }