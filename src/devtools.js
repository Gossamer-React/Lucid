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
      update: 'false',
      logs: []
    };

    chrome.devtools.panels.create(
      'Lucid',
      null,
      'devtools.html',
      () => {
        let state = this.state;
        const backgroundPort = chrome.runtime.connect({ name: 'devtool-background-port' });

        // *adds a listener to listen for any messages being sent by our background script
        backgroundPort.onMessage.addListener((req) => {
          // * checkes if the message it's receiving is about a request about an http request or a change in the DOM
          if (req.type === 'requestLogs') {
            console.log('state!!', state);
            console.log('Message from background script:', req.msg);
            const newLogs = req.msg;
            state.setState({ update: 'true' });
          } else if (req.type === 'appState') {
            console.log('appState: ', req.msg);
          }
        });
      }
    );
  }

  render() {
    return (
      <div id="app-container">
        <LogContainer />
        <h1>Welcome to React-Lucid: {this.state.update}</h1>
        <Effects />
        <TreeDiagram />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
