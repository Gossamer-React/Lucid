import React, { Component } from 'react';
import { render } from 'react-dom';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import Effects from './containers/Effects';
import TreeDiagram from './components/TreeDiagram.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      state: 'HELLO'
    };
    chrome.devtools.panels.create(
      'Lucid',
      null,
      'devtools.html',
      () => {
        console.log('Panel was created!!');

        // chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
        //   alert('devtools:', response)
        // })

        //const port = chrome.extension.connect({ name: 'knockknock' });
        // chrome.runtime.onConnect.addListener(function(port) {;
        //   alert('portname:', port.name);
        //   port.onMessage.addListener(function(msg) {
        //     console.log('devtools-listener activated')
        //     if (msg.joke == "Knock knock") {
        //       alert('knock knock received')
        //       port.postMessage({question: "Who's there?"});
        //       alert('asked whosthere?')
        //     }
        //     else if (msg.answer == "Madame")
        //     port.postMessage({question: "Madame who?"});
        //     else if (msg.answer == "Madame... Bovary")
        //     port.postMessage({question: "I don't get it."});
        //   });
        // });
        // port.postMessage({
        //   name: 'connect',
        //   tabId: chrome.devtools.inspectedWindow.tabId,
        // });
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
  }

  render() {
    return (
      <div id="app-container">
        <LogContainer />
        <h1>Welcome to React-Lucid</h1>
        <Effects />
        <TreeDiagram />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
