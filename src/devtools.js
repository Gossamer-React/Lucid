import React, { Component } from 'react';
import { render } from 'react-dom';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import Effects from './containers/Effects';
import TreeDiagram from './components/TreeDiagram.jsx';
import { networkInterfaces } from 'os';

class App extends Component {
  constructor() {
    super();
    this.state = {
      logs: []
    };
    chrome.devtools.panels.create(
      'Lucid',
      null,
      'devtools.html',
      () => {
        let state = this.state;
        const port = chrome.extension.connect({name: 'lucid'});

        console.log(port);

        port.onMessage.addListener((req) => {
          console.log('state!!', state);
          console.log(req.msg);
          const newLogs = req.msg;
          state.setState({logs: newLogs});
        });
        
        // chrome.runtime.onMessage.addlistener((msg, sender, sendResponse) => {
        //   if(msg.types === 'logs'){
        //     console.log(`Hey i got a from ${sender} it says ${msg}`);
        //     console.log("-STATE-", this.state);
        //     sendResponse({msg: 'Hello background script'});
        //   }
        // });
      }
    );
  }

  render() {
    console.log(this.state.logs);
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
