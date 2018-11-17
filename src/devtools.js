import React, { Component } from 'react';
import { render } from 'react-dom';
import LogContainer from './containers/LogContainer.jsx';
import styles from './../public/app.css';
import Effects from './containers/Effects';
import TreeDiagram from './components/TreeDiagram.jsx';

class App extends Component {
  constructor() {
    this.state = {
      state: 'HELLO'
    };
    chrome.devtools.panels.create(
      'Lucid',
      null,
      'devtools.html',
      () => {
        console.log('Panel was created!!');
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
