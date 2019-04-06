// * Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { introspectionQuery } from 'graphql';
import recurseDiff from './stateDiff';
import filter from './filterDOM';
// * Components
import AppNav from './components/AppNav';
import GraphQLTab from './containers/GraphQLTab';
import ReactTab from './containers/ReactTab';
// * CSS
import styles from './../public/app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: 'Graphql',
      logs: [],
      appReactDOM: [],
      appFilteredDOM: [],
      appState: [],
      nodeData: [],
      schema: 'GraphQL schema not available.',
      stateDiff: [],
      logView: null,
      componentsToFilter: []
    };

    chrome.devtools.panels.create('Lucid', null, 'devtools.html');
  }

  componentDidMount() {
    const appState = this;

    let chromePort = chrome.runtime.connect({
      name: 'devtool-background-port'
    });

    chromePort.postMessage({
      name: 'connect',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    let timeout;
    chromePort.onMessage.addListener(req => {
      // * checks if the message it's receiving is about a change in the DOM
      if (req.type === 'appState') {
        let oldstate = this.state.appReactDOM;
        appState.setState({ appReactDOM: req.msg });

        if (oldstate.length > 0) {
          let diff = recurseDiff(oldstate, this.state.appReactDOM);
          appState.setState({ stateDiff: diff });
        }

        //if there is an active setTimeout, clear it
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          appState.setState({ appState: req.msg });
        }, 1000);
      }
    });

    //* Leverage Javascript API for WebExtensions to access browser network tab and log req/res objects in state log array
    chrome.devtools.network.onRequestFinished.addListener(function(httpReq) {
      if (httpReq.request.postData !== undefined) {
        let reqBody = JSON.parse(httpReq.request.postData.text);

        if (reqBody.variables && reqBody.query) {
          let log = {};
          log.req = httpReq.request;

          if (httpReq.response.content) {
            httpReq.getContent(responseBody => {
              if (responseBody === '') {
                log.res = 'No response received';
              } else {
                const parsedResponseBody = JSON.parse(responseBody);
                log.res = parsedResponseBody;
                appState.setState({
                  logs: [...appState.state.logs, log],
                  logView: log
                });
              }
            });
          }
        }
      }
    });
  }

  //* function to dynamically grab url for backend, and fetch GraphQL schema from Apollo Server and add to state
  fetchSchemaFromGraphQLServer() {
    if (this.state.logs.length !== 0) {
      let url = this.state.logs[this.state.logs.length - 1].req.url;

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: introspectionQuery })
      })
        .then(res => res.json())
        .then(json =>
          this.setState({
            schema: JSON.stringify(json.data)
          })
        );
    }
  }

  //* invoke schema fetch only after a log object from a previous response is available
  componentDidUpdate(prevProps, prevState) {
    if (this.state.schema === 'GraphQL schema not available.') {
      this.fetchSchemaFromGraphQLServer();
    }

    if (prevState.appState !== this.state.appState) {
      if (this.state.componentsToFilter.length) {
        let result = [];
        filter(this.state.appState, this.state.componentsToFilter, result);
        this.setState({ appFilteredDOM: result });
      }
    }
  }

  // * Handles the tab click for tree and req/res window
  handleWindowChange = target => {
    if (this.state.window === 'Graphql' && target.dataset.btn === 'React') {
      this.setState({ window: 'React' });
      document.querySelector('#reactbtn').classList.add('active');
      document.querySelector('#graphqlbtn').classList.remove('active');
    } else if (
      this.state.window === 'React' &&
      target.dataset.btn === 'Graphql'
    ) {
      this.setState({ window: 'Graphql' });
      document.querySelector('#reactbtn').classList.remove('active');
      document.querySelector('#graphqlbtn').classList.add('active');
    }
  };

  // * Handles the filter for the component tree
  handleFilter = (e, arr) => {
    if (e.target.classList.contains('toggleOn')) {
      e.target.classList.remove('toggleOn');
    } else {
      e.target.classList.add('toggleOn');
    }
    let result = [];
    if (!this.state.componentsToFilter.includes(arr[0])) {
      let componentsArr = this.state.componentsToFilter.concat(arr);
      filter(this.state.appState, componentsArr, result);
      this.setState({
        componentsToFilter: componentsArr,
        appFilteredDOM: result
      });
    } else {
      let list = this.state.componentsToFilter;
      for (let i = 0; i < list.length; i++) {
        if (arr.includes(list[i])) {
          list.splice(i--, 1);
        }
      }
      filter(this.state.appState, list, result);
      this.setState({
        componentsToFilter: list,
        appFilteredDOM: result
      });
    }
  }

  //* handle data coming back from mouse hover in tree diagram
  handleMouseOver = (data) => {
    this.setState({
      nodeData: data
    });
  }

  // * handles the clearing of both the  request log and diff log
  handleClearLog = e => {
    const data = e.target.dataset.log;
    if (data === 'req-log') {
      this.setState({ logs: [] });
    } else {
      this.setState({ stateDiff: [] });
    }
  };

  // * handles the change of a log
  handleLogChange = reqId => {
    let req = this.state.logs[reqId];
    req.id = reqId;
    this.setState({ logView: req });
  };

  render() {
    return (
      <div id='app-container'>
        <AppNav handleWindowChange={this.handleWindowChange} />
        {/* This checks which window the user has click on. 
              They can click either React Tab  (to see the state tree) or GraphQL tab (to see the 
              request/reponse from their httprequest) */}
        {this.state.window === 'Graphql' ? (
          <GraphQLTab
            logs={this.state.logs}
            clearLog={this.handleClearLog}
            logChange={this.handleLogChange}
            schema={this.state.schema}
            log={this.state.logView}
            tab={this.state.window}
          />
        ) : (
          <ReactTab
            appStateLength={this.state.appState.length}
            clearLog={this.handleClearLog}
            stateDiffs={this.state.stateDiff}
            appState={
              this.state.appFilteredDOM.length === 0
                ? this.state.appState
                : this.state.appFilteredDOM
            }
            handleMouseOver={this.handleMouseOver}
            handleFilter={this.handleFilter}
            nodeData={this.state.nodeData}
            tab={this.state.window}
          />
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
