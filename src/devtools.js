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
        const port = chrome.runtime.connect({ name: 'lucid' });

        console.log(port);

        port.onMessage.addListener((req) => {
          console.log('BACKGROUND SCRIPT: ', req.msg);
          if (req.type === 'requestLogs') {
            console.log('state!!', state);
            console.log('Message from background script:', req.msg);
            // const newLogs = req.msg;
            // state.setState({ logs: newLogs });
          }
        });
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
