import React, { Component } from 'react';
import { render } from 'react-dom';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import Effects from './components/Effects';
import TreeDiagram from './components/TreeDiagram.jsx';
import { networkInterfaces } from 'os';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      appState: [],
      stateProps: []
    };
    chrome.devtools.panels.create(
      'Lucid',
      null,
      'devtools.html',
      () => {
        // this.state.setState({update: 'true'});
        let state = this;
        const backgroundPort = chrome.runtime.connect({ name: 'devtool-background-port' });

        // sends a 'connect' message to backgroundScript to trigger reactTraverse
        backgroundPort.postMessage({
          name: 'connect',
          tabId: chrome.devtools.inspectedWindow.tabId
        })

        // *adds a listener to listen for any messages being sent by our background script
        backgroundPort.onMessage.addListener((req) => {
          // * checkes if the message it's receiving is about a request about an http request or a change in the DOM
          if (req.type === 'requestLogs') {
            console.log('state!!', state.state);
            console.log('Message from background script:', req.msg);
            const newLogs = req.msg;
            state.setState({ logs: newLogs });
          } else if (req.type === 'appState') {
            console.log('appState:----------------- ', req.msg);
            const applicationState = req.msg;
            state.setState({ appState: applicationState });
            console.log(this.state.appState, 'newly updated appState')
          }
        });
      }
    );
  }

  render() {
    return (
      <div id="app-container">
        <LogContainer logs={this.state.logs} />
        <h1>Welcome to React-Lucid</h1>
        <Effects logs={this.state.logs} />
        <TreeDiagram
          appState={this.state.appState}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
